const Boom = require('@hapi/boom');

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

module.exports = boomErrors;
