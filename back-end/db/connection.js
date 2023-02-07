const { Client } = require('pg');

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: '123',
  database: 'finals'
};

const db = new Client(dbParams);

db.connect();

module.exports = db;
