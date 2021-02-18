const Boom = require('@hapi/boom');

module.exports = (req, res, next) => {
  const err = Boom.notFound();
  next(err);
};
