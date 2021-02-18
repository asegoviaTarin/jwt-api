const router = require('express').Router();
const usersController = require('./users.bll');

router.post(
  '/auth',
  usersController.auth,
);

router.post(
  '/',
  usersController.create,
);

module.exports = router;
