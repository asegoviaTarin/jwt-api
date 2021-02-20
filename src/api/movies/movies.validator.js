const Joi = require('@hapi/joi');

const { MOVIES_GENRES } = require('./movies.enums');

exports.create = {
  body: {
    title: Joi.string().required(),
    genre: Joi.string().uppercase().valid(MOVIES_GENRES),
    decription: Joi.string(),
    poster: Joi.string(),
  },
};

exports.search = {
  query: Joi.object({
    title: Joi.string().min(3),
    genre: Joi.array().items(Joi.string().valid(MOVIES_GENRES)),
  }),
};

exports.delete = {
  params: {
    id: Joi.string().required,
  },
};
