const express = require('express');
const session = require('express-session');
const path = require('path');
const { conectar } = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'petshop123',
  resave: false,
  saveUninitialized: false
}));

// Rota raiz vai para projetos
app.get('/', (req, res) => {
  res.redirect('/projects');
});

app.use('/projects', require('./routes/projects'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/pets', require('./routes/pets'));

conectar().then(() => {
  app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
    console.log('Acesse: http://localhost');
  });
});
