// eslint-disable-next-line no-unused-vars
const { MongoClient, Db } = require('mongodb');
const config = require('./config');

const { url, database } = config.mongo;

let client;

/**
 * @type { Db }
 */
let db;

module.exports = {
  db: () => db,

  connect: async () => {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(database);
  },

  close: async () => {
    if (client) {
      await client.close();
    }
  },
};
