const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'petshop';

let db;

async function conectar() {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('Conectado ao MongoDB');
}

function getDb() {
  return db;
}

module.exports = { conectar, getDb };
