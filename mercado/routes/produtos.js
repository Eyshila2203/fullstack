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

// GET listagem pública
router.get('/', async (req, res) => {
  const db = getDb();
  const produtos = await db.collection('produtos').find().toArray();
  res.render('produtos/listagem', { produtos: produtos, usuario: req.session.usuario || null });
});

// GET gerência (protegida)
router.get('/gerencia', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const produtos = await db.collection('produtos').find().toArray();
  res.render('produtos/gerencia', { produtos: produtos, usuario: req.session.usuario });
});

// POST cadastrar - CREATE
router.post('/cadastrar', loginObrigatorio, async (req, res) => {
  const { nome, categoria, marca, preco, qtde_disponivel } = req.body;
  const db = getDb();

  await db.collection('produtos').insertOne({
    nome: nome,
    categoria: categoria,
    marca: marca,
    preco: Number(preco),
    qtde_disponivel: Number(qtde_disponivel)
  });

  res.redirect('/produtos/gerencia');
});

// GET editar
router.get('/editar/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const produto = await db.collection('produtos').findOne({ _id: new ObjectId(req.params.id) });
  res.render('produtos/editar', { produto: produto, usuario: req.session.usuario });
});

// POST atualizar - UPDATE
router.post('/atualizar/:id', loginObrigatorio, async (req, res) => {
  const { nome, categoria, marca, preco, qtde_disponivel } = req.body;
  const db = getDb();

  await db.collection('produtos').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: {
      nome: nome,
      categoria: categoria,
      marca: marca,
      preco: Number(preco),
      qtde_disponivel: Number(qtde_disponivel)
    }}
  );

  res.redirect('/produtos/gerencia');
});

// POST remover - DELETE
router.post('/remover/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  await db.collection('produtos').deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect('/produtos/gerencia');
});

// POST vender - UPDATE (decrementa quantidade)
router.post('/vender/:id', loginObrigatorio, async (req, res) => {
  const db = getDb();
  const produto = await db.collection('produtos').findOne({ _id: new ObjectId(req.params.id) });

  if (produto && produto.qtde_disponivel > 0) {
    await db.collection('produtos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { qtde_disponivel: produto.qtde_disponivel - 1 } }
    );
  }

  res.redirect('/produtos/gerencia');
});

module.exports = router;
