const router = require('express').Router();
const usersController = require('./users.controller');

router.post(
  '/auth',
  usersController.auth,
);

router.post(
  '/',
  usersController.create,
);

module.exports = router;
