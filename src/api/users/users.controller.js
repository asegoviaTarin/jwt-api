const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const usersRepo = require('./users.repository');

const { secret, expiresIn } = config.auth.jwt;

module.exports.create = async (req, res, next) => {
  const { body } = req;
  const { username, password } = body;
  if (username && password) {
    const user = { username, password };
    try {
      await usersRepo.create(user);
    } catch (error) {
      return next(error);
    }
  }

  return res.send(201);
};

module.exports.auth = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = await usersRepo.auth(username, password);
  if (!user) return res.send(401);

  const token = jwt.sign(user, secret, { expiresIn });
  return res.send({ token });
};
