// Update with your config settings.

var connection = {
  host: process.env.APP_DB_HOST || '127.0.0.1',
  user: process.env.APP_DB_USER || '',
  password: process.env.APP_DB_PASSWORD || '',
  database: process.env.APP_DB_NAME || 'portfolio_test'
};

module.exports = {

  development: {
    client: 'postgresql',
    connection: connection
  },

  staging: {
    client: 'postgresql',
    connection: connection,
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: connection,
    pool: {
      min: 2,
      max: 10
    }
  }
};
