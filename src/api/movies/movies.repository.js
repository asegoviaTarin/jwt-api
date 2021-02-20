const mongo = require('mongodb');

const { db } = require('../../config/database');

const { ObjectId } = mongo;
const COLLECTION_MOVIES = 'movies';
const DEFAULT_MOVIES = require('./defaultMovies');
const { escapeString } = require('../../helpers/string');

module.exports._initialize = async () => {
  const movies = await db().collection(COLLECTION_MOVIES).findOne();
  if (!movies) {
    await db().collection(COLLECTION_MOVIES)
      .insertMany(DEFAULT_MOVIES);
  }
};

module.exports.create = (movie) => db().collection(COLLECTION_MOVIES)
  .insertOne(movie);

module.exports.delete = (id) => db().collection(COLLECTION_MOVIES)
  .removeOne({ _id: ObjectId(id) });

function getSearchQuery(params = {}) {
  delete params.limit;
  delete params.skip;
  const query = {};

  if (params.genre) {
    query.genre = { $in: params.genre };
    delete params.genre;
  }

  if (params.title) {
    query.title = { $regex: escapeString(params.title), $options: 'i' };
    delete params.title;
  }

  // Search by other params
  Object.entries(params).forEach(([key, value]) => {
    query[key] = value;
  });

  return query;
}

module.exports.search = (params = {}) => {
  const { limit, skip } = params;
  const options = { limit, skip };
  const query = getSearchQuery({ ...params });
  return db().collection(COLLECTION_MOVIES).find(query, options).toArray();
};

module.exports.count = (params = {}) => {
  const query = getSearchQuery({ ...params });
  return db().collection(COLLECTION_MOVIES).countDocuments(query);
};
