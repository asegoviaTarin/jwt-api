
const usersRepo = require('./users.repository');

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

  res.send(201);
};

// TODO: refactor with jwt
module.exports.auth = async (req, res, next) => {
  const { body } = req;
  const { username, password } = body;

  const user = await usersRepo.auth(username, password);
  if (user) res.send(201);

  res.send(401);
};
