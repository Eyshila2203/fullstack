const express = require('express');
const path = require('path');
const colors = require('colors');
const dns = require('dns');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://eyshila2203:eyshilaN@cluster0.bygqyfw.mongodb.net/?appName=Cluster0";

// Força o Node.js a resolver IPv4 primeiro
dns.setDefaultResultOrder('ipv4first'); 

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/estufa/public', express.static(path.join(__dirname, 'public')));
let db;

// Conecta ao banco e depois liga o servidor
async function startServer() {
    try {
        console.log("Tentando conectar ao MongoDB Atlas...".yellow);
        await client.connect();
        
        db = client.db("EstufeiDB");
        console.log("Estufei conectado com sucesso!".magenta);

        app.listen(80, () => {
            console.log('Estufei rodando na porta 80'.rainbow);
        });

    } catch (error) {
        console.log("\n❌ ERRO CRÍTICO DE CONEXÃO:".red);
        console.error(error);
        process.exit(1);
    }
}

startServer();

app.get('/apresentacao', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// --- ROTAS DE USUÁRIO ---

app.get('/jardineironovo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jardineironovo.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/cadastrar_jardineiro', async (req, res) => {
    await db.collection('Jardineiro').insertOne({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
    });
    res.send(`
        <link rel="stylesheet" href="../public/pointdocss/css_inicial/estilo.css">
        <div class="container" style="margin-top:3rem; text-align:center;">
            <div class="alert alert-success" style="max-width:400px; margin:0 auto;">
                Olá novo(a) jardineiro(a)! A Estufei é onde a sua plantinha fica de "barriga" estufadinha!
            </div>
            <p class="mt-1"><a href="/plantas" class="link">Entrar</a></p>
        </div>
    `);
});

app.post('/logar', async (req, res) => {
    const Jardineiro = await db.collection('Jardineiro').findOne({
        login: req.body.login,
        senha: req.body.senha
    });
    if (Jardineiro) {
        res.send(`
            <link rel="stylesheet" href="../public/pointdocss/css_inicial/estilo.css">
            <div class="container" style="margin-top:3rem; text-align:center;">
                <div class="alert alert-success" style="max-width:400px; margin:0 auto;">
                    Bem-vindo de volta, ${Jardineiro.nome}!
                </div>
                <p class="mt-1"><a href="/plantas" class="link">Entrar</a></p>
            </div>
        `);
    } else {
        res.send(`
            <link rel="stylesheet" href="../public/pointdocss/css_inicial/estilo.css">
            <div class="container" style="margin-top:3rem; text-align:center;">
                <div class="alert alert-error" style="max-width:400px; margin:0 auto;">
                    Login ou senha incorretos.
                </div>
                <p class="mt-1"><a href="/login" class="link">Tentar novamente</a></p>
            </div>
        `);
    }
});

// --- ROTAS DE PLANTAS ---

app.get('/plantas', async (req, res) => {
    const listaplantas = await db.collection('Plantas').find({ status: { $ne: "Removida" } }).toArray();
    res.render('gerenciar_plantas', { plantas: listaplantas });
});

// CORRIGIDO: Removido o /:id daqui, pois planta nova ainda não possui ID
app.post('/plantas/novas', async (req, res) => {
    await db.collection('Plantas').insertOne({
        especie: req.body.especie,
        cor: req.body.cor,
        plantio: req.body.plantio,
        status: req.body.status || "Saudável",
        ultima_rega: req.body.ultima_rega || "Acabou de ser plantada"
    });
    res.redirect('/plantas');
});

// CORRIGIDO: Alterado para singular (/planta/) para consertar o Cannot GET
app.get('/plantas/editar/:id', async (req, res) => {
    const plantas = await db.collection('Plantas').findOne({ _id: new ObjectId(req.params.id) });
    res.render('editar_plantas', { plantas });
});

// CORRIGIDO: Alterado para singular e usando req.body.id vindo do input hidden
app.post('/plantas/atualizar', async (req, res) => {
    await db.collection('Plantas').updateOne(
        { _id: new ObjectId(req.body.id) }, 
        { $set: {
            especie: req.body.especie,
            cor: req.body.cor,
            plantio: req.body.plantio,
            status: req.body.status,
            ultima_rega: req.body.ultima_rega
        }}
    );
    res.redirect('/plantas');
});

// CORRIGIDO: Alterado para singular e adicionado /:id na URL para capturar com req.params.id
app.get('/plantas/regar/:id', async (req, res) => {
    await db.collection('Plantas').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: "Saudável", ultima_rega: "Hoje cedo" } }
    );
    res.redirect('/plantas');
});

// CORRIGIDO: Alterado para singular (/planta/) para evitar erros de rota inexistente
app.get('/plantas/remover/:id', async (req, res) => {
    const planta = await db.collection('Plantas').findOne({ _id: new ObjectId(req.params.id) });
    res.render('confirmar_remocao', { planta }); 
});

// CORRIGIDO: Alterado para singular e trocado req.params.id por req.body.id (vindo do formulário oculto)
app.post('/plantas/remover', async (req, res) => {
    const motivo = req.body.motivo; 
    const detalheMotivo = req.body.detalhe_motivo || ""; 

    await db.collection('Plantas').updateOne(
        { _id: new ObjectId(req.body.id) },
        { 
            $set: { 
                status: "Removida",
                motivo_remocao: motivo,
                detalhe_remocao: detalheMotivo,
                data_remocao: new Date()
            } 
        }
    );
    res.redirect('/plantas');
});