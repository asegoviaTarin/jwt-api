const router = require('express').Router();
const config = require('../../config/config');
const jwt = require('express-jwt');

const userRouter = require('./users/users.router');
const moviesRouter = require('./movies/movies.router');

const path = [
  {
    url: '/users',//config.endpoint.path,
    methods: 'POST',
  },
  {
    url: '/movies',//config.endpoint.path,
    methods: 'GET',
  },
];

const { secret, algorithms } = config.auth.jwt;
const { header } = config.auth;

/**
 * Use authentication middlewares before any other middleware to ensure that
 * every request has to be authenticated and auth is set on headers.
 */
function stringifyAuthHeader(req, res, next) {
  // Check to avoid Error: "value" required in setHeader("auth", value)
  if (req.headers.auth) {
    req.headers.auth = JSON.stringify(req.headers[header]);
  }

  next();
}

router.use([
  jwt({ secret, algorithms, requestProperty: `headers.${header}` }).unless({ path }),
  stringifyAuthHeader,
]);

router.use('/user', userRouter)
router.use('/movies', moviesRouter);

module.exports = router;
