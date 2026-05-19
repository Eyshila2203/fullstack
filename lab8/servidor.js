var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');
var path = require('path'); // Auxilia a encontrar os caminhos das pastas

var app = express();

// Configurações de arquivos estáticos e interpretadores de dados
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração obrigatória do Motor EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// --- ROTAS DO SEU TRABALHO ---

// 1. O endereço padrão ('/') direciona para a página de projetos (Exigência do enunciado)
app.get('/', function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'views', 'project.html'));
});

// 2. Rota para abrir a página de Login (Exigência: '/login')
app.get('/login', function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// 3. Rota para abrir a página de Cadastro (Exigência: '/cadastra')
app.get('/cadastra', function (requisicao, resposta) {
    resposta.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

// 4. PROCESSAMENTO DO CADASTRO (Via GET, igual ao seu exemplo)
// Quando o formulário de Cadastro.html enviar os dados, eles caem aqui
app.get('/cadastro_dados', function (requisicao, resposta) {
    // Captura os dados vindos do formulário através da URL (query)
    var nome = requisicao.query.nome;
    var sobrenome = requisicao.query.sobrenome;
    var nascimento = requisicao.query.nascimento;
    var civil = requisicao.query.civil;

    // Renderiza a página dinâmica passando as variáveis capturadas
    resposta.render('resposta_cadastro', { nome, sobrenome, nascimento, civil });
});

// 5. PROCESSAMENTO DO LOGIN (Via POST, igual ao seu exemplo do '/inicio')
app.post('/logar', function (requisicao, resposta) {
    var usuario = requisicao.body.login; // Pega o campo 'name="login"' do formulário
    var senha = requisicao.body.senha;   // Pega o campo 'name="senha"' do formulário

    // Simulação de validação simples sem Banco de Dados
    if (usuario === "admin" && senha === "1234") {
        resposta.render('resposta_login', {
            sucesso: true,
            titulo: "Bem-vindo!",
            mensagem: "Você foi logado com sucesso!!"
        });
    } else {
        resposta.render('resposta_login', {
            sucesso: false,
            titulo: "Falha no Login",
            mensagem: "Usuário ou senha incorretos."
        });
    }
});

// Criação do servidor rodando estritamente na porta 80
var server = http.createServer(app);
server.listen(80, function() {
    console.log('Servidor rodando com sucesso na porta 80...'.rainbow);
});