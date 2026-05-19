const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const colors = require('colors');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const client = new MongoClient('mongodb+srv://johnjuniornunes2203_db_user:Ju172812.@cluster0.6numsge.mongodb.net/?appName=Cluster0');
let db;

async function initDB() {
    await client.connect();
    db = client.db("ConcessionariaDB");
    console.log("Banco Conectado!".green);
}
initDB();

// Rota padrão -> projects.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Página de cadastro de usuário
app.get('/cadastro-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro-usuario.html'));
});

// Página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// --- USUÁRIOS ---

// CREATE: Cadastrar usuário
app.post('/cadastrar-usuario', async (req, res) => {
    await db.collection('Usuarios').insertOne({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha
    });
    res.send(`
        <link rel="stylesheet" href="/public/estilo.css">
        <div class="container" style="margin-top:3rem; text-align:center;">
            <div class="alert alert-success" style="max-width:400px; margin:0 auto;">
                Usuário cadastrado com sucesso!
            </div>
            <p class="mt-1"><a href="/login" class="link">Ir para o Login</a></p>
        </div>
    `);
});

// POST: Login de usuário
app.post('/logar', async (req, res) => {
    const usuario = await db.collection('Usuarios').findOne({
        login: req.body.login,
        senha: req.body.senha
    });
    if (usuario) {
        res.send(`
            <link rel="stylesheet" href="/public/estilo.css">
            <div class="container" style="margin-top:3rem; text-align:center;">
                <div class="alert alert-success" style="max-width:400px; margin:0 auto;">
                    Bem-vindo, ${usuario.nome}!
                </div>
                <p class="mt-1"><a href="/carros" class="link">Ver carros</a></p>
            </div>
        `);
    } else {
        res.send(`
            <link rel="stylesheet" href="/public/estilo.css">
            <div class="container" style="margin-top:3rem; text-align:center;">
                <div class="alert alert-error" style="max-width:400px; margin:0 auto;">
                    Login ou senha incorretos.
                </div>
                <p class="mt-1"><a href="/login" class="link">Tentar novamente</a></p>
            </div>
        `);
    }
});

// --- CARROS ---

// READ: Listar carros
app.get('/carros', async (req, res) => {
    const listaCarros = await db.collection('Carros').find().toArray();
    res.render('gerenciar_carros', { carros: listaCarros });
});

// CREATE: Adicionar carro
app.post('/carro/novo', async (req, res) => {
    await db.collection('Carros').insertOne({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        qtde_disponivel: parseInt(req.body.qtde)
    });
    res.redirect('/carros');
});

// UPDATE: Página de edição
app.get('/carro/editar/:id', async (req, res) => {
    const carro = await db.collection('Carros').findOne({ _id: new ObjectId(req.params.id) });
    res.render('editar_carro', { carro });
});

// UPDATE: Salvar edição
app.post('/carro/atualizar/:id', async (req, res) => {
    await db.collection('Carros').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: {
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano,
            qtde_disponivel: parseInt(req.body.qtde)
        }}
    );
    res.redirect('/carros');
});

// UPDATE: Vender carro (decrementa quantidade)
app.get('/carro/vender/:id', async (req, res) => {
    await db.collection('Carros').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $inc: { qtde_disponivel: -1 } }
    );
    res.redirect('/carros');
});

// DELETE: Remover carro
app.get('/carro/remover/:id', async (req, res) => {
    await db.collection('Carros').deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect('/carros');
});

// Porta 80
app.listen(80, () => {
    console.log('Servidor ativo na porta 80'.rainbow);
});
