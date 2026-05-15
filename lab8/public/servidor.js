const express = require('express');
const app = express();
const path = require('path');

// Configuração do EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Para ler dados do formulário

// ROTA: Endereço padrão (/) -> Direciona para Projects.html
app.get('/project', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'project.html'));
});

app.get('/cadastra', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(80, () => {
    console.log("Servidor rodando na porta 80");
});