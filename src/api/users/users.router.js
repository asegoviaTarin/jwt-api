const router = require('express').Router();

router.post(
  '/',
  (req, res, next) => res.send(200),
);


module.exports = router;
