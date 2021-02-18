'use strict';

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  auth: {
      jwt: {
        secret: process.env.AUTH_JWT_SECRET || '19930612',
        algorithms: process.env.AUTH_JWT_ALGORITMS || ['HS256']

      },
    header: process.env.AUTH_HEADER || 'auth'
  }
};
