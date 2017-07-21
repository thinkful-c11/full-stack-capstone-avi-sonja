require('dotenv').config({silent:true});
exports.DATABASE = {
  client: 'pg',
  connection: process.env.DATABASE_URL || global.DATABASE_URL || 'postgresql://dev:dev@localhost/dev-pairingsdb',
  // debug: true
};
exports.TEST_DATABASE = {
  client: 'pg',
  connection: process.env.TEST_DATABASE_URL || 'postgresql://dev:dev@localhost/test-pairingsdb',
};
exports.PORT = process.env.PORT || 8080;