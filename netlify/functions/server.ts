const { createRequestHandler } = require('@remix-run/netlify');
const { MongoClient } = require('mongodb');

let client;

async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
  }
  return client.db('notes-backend');
}

exports.handler = createRequestHandler({
  getLoadContext() {
    // Whatever you return here will be passed as `context` to your loaders.
    return getDb();
  },
});