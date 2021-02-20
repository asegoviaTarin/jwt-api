const { db } = require('../../config/database');

const COLLECTION_USERS = 'users';

module.exports._initialize = async () => {
  await db().collection(COLLECTION_USERS).createIndex({ username: 1 }, { unique: true });

  const user = await db().collection(COLLECTION_USERS).findOne();
  if (!user) {
    await db().collection(COLLECTION_USERS)
      .insertOne({ username: 'admin', password: 'admin' });
  }
};

module.exports.create = (user) => db().collection(COLLECTION_USERS)
  .insertOne(user);

module.exports.auth = (username, password) => db().collection(COLLECTION_USERS)
  .findOne({ username, password });
