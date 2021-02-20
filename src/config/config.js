require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    database: process.env.MONGO_DATABASE || 'db',
  },
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET || '19930612',
      algorithms: process.env.AUTH_JWT_ALGORITMS || ['HS256'],
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    header: process.env.AUTH_HEADER || 'auth',
  },
};
