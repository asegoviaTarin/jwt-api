const moviesRepo = require('./movies.repository');

module.exports.create = async (req, res, next) => {
  const { body } = req;
  try {
    await moviesRepo.create(body);
  } catch (error) {
    return next(error);
  }

  console.info('Created success!');
  return res.sendStatus(201);
};

module.exports.delete = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    await moviesRepo.delete(id);
  } catch (error) {
    return next(error);
  }

  console.info('Deleted success!');
  return res.send(200);
};

module.exports.search = async (req, res) => {
  const { query } = req;

  const [data, total] = await Promise.all([
    moviesRepo.search(query),
    moviesRepo.count(query),
  ]);
  return res.send({ data, total });
};
