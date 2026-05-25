const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// GET cadastro
router.get('/cadastro', (req, res) => {
  res.render('usuarios/cadastro', { erro: null, sucesso: null, usuario: req.session.usuario || null });
});

// POST cadastro - CREATE
router.post('/cadastro', async (req, res) => {
  const { nome, login, senha } = req.body;
  const db = getDb();

  try {
    const jaExiste = await db.collection('usuarios').findOne({ login: login });
    if (jaExiste) {
      return res.render('usuarios/cadastro', { erro: 'Login já cadastrado!', sucesso: null, usuario: req.session.usuario || null });
    }

    await db.collection('usuarios').insertOne({
      nome: nome,
      login: login,
      senha: senha
    });

    res.render('usuarios/cadastro', { erro: null, sucesso: 'Usuário cadastrado com sucesso!', usuario: req.session.usuario || null });
  } catch (err) {
    res.render('usuarios/cadastro', { erro: 'Erro ao cadastrar.', sucesso: null, usuario: req.session.usuario || null });
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('usuarios/login', { erro: null, usuario: req.session.usuario || null });
});

// POST login - READ
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  const db = getDb();

  try {
    const usuario = await db.collection('usuarios').findOne({ login: login, senha: senha });

    if (!usuario) {
      return res.render('usuarios/login', { erro: 'Login ou senha incorretos!', usuario: null });
    }

    req.session.usuario = { nome: usuario.nome, login: usuario.login };
    res.redirect('/pets');
  } catch (err) {
    res.render('usuarios/login', { erro: 'Erro ao fazer login.', usuario: null });
  }
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/usuarios/login');
});

module.exports = router;
