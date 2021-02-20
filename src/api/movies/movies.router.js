const router = require('express').Router();
const mw = require('../../middlewares');
const moviesValidator = require('./movies.validator');
const moviesController = require('./movies.controller');

router.get(
  '/search',
  mw.validator(moviesValidator.search),
  moviesController.search,
);

router.post(
  '/',
  mw.validator(moviesValidator.create),
  moviesController.create,
);

router.delete(
  '/:id',
  // mw.validator(moviesValidator.delete),
  moviesController.delete,

);

module.exports = router;
