const Boom = require('@hapi/boom');
const celebrateErrors = require('celebrate').errors();

// TODO: use logger
function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

// eslint-disable-next-line no-unused-vars
function boomErrors(err, req, res, next) {
  if (!Boom.isBoom(err)) {
    if (err.name === 'UnauthorizedError') {
      err = Boom.unauthorized(err.message);
    } else if (err.code === 'EAI_AGAIN' || err.code === 'ECONNREFUSED') {
      err = Boom.serverUnavailable();
    } else if (err.type === 'entity.parse.failed') {
      err = Boom.badRequest(err.message);
    } else if (err.name === 'MongoError' && err.code === 11000) {
      err = Boom.conflict();
    } else {
      err = Boom.badImplementation();
    }
  }

  res.status(err.output.statusCode).send(err.output.payload);
}

module.exports = [logError, celebrateErrors, boomErrors];
