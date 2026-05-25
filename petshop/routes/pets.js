const express = require('express');
const router = express.Router();
const { getDb } = require('../db');
const { ObjectId } = require('mongodb');

function loginObrigatorio(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/usuarios/login');
  }
  next();
}

// GET listagem pública de pets
router.get('/', async (req, res) => {
  const db = getDb();
  const pets = await db.collection('pets').find().toArray();
  res.render('pets/listagem', { pets: pets, usuario: req.session.usuario || null });
});

// GET gerência (protegida)
router.get('/gerencia', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const pets = await db.collection('pets').find().toArray();
  res.render('pets/gerencia', { pets: pets, usuario: req.session.usuario, erro: null, sucesso: null });
});

// POST cadastrar novo pet - CREATE
router.post('/cadastrar', loginObrigatorio, async (req, res) => {
  const { especie, raca, idade, qtde_disponivel, preco } = req.body;
  const db = getDb();

  await db.collection('pets').insertOne({
    especie: especie,
    raca: raca,
    idade: Number(idade),
    qtde_disponivel: Number(qtde_disponivel),
    preco: Number(preco)
  });

  res.redirect('/pets/gerencia');
});

// POST atualizar pet - UPDATE
router.post('/atualizar/:id', loginObrigatorio, async (req, res) => {
  const { especie, raca, idade, qtde_disponivel, preco } = req.body;
  const db = getDb();

  await db.collection('pets').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: {
      especie: especie,
      raca: raca,
      idade: Number(idade),
      qtde_disponivel: Number(qtde_disponivel),
      preco: Number(preco)
    }}
  );

  res.redirect('/pets/gerencia');
});

// POST remover pet - DELETE
router.post('/remover/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  await db.collection('pets').deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect('/pets/gerencia');
});

// POST vender pet - UPDATE (decrementa quantidade)
router.post('/vender/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const pet = await db.collection('pets').findOne({ _id: new ObjectId(req.params.id) });

  if (pet && pet.qtde_disponivel > 0) {
    await db.collection('pets').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { qtde_disponivel: pet.qtde_disponivel - 1 } }
    );
  }

  res.redirect('/pets/gerencia');
});

// GET formulário de edição
router.get('/editar/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const pet = await db.collection('pets').findOne({ _id: new ObjectId(req.params.id) });
  res.render('pets/editar', { pet: pet, usuario: req.session.usuario });
});

module.exports = router;
