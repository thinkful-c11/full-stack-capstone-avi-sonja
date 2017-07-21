// 'use strict';
// if (process.env.NODE_ENV !== 'production'){
//   require('dotenv').config();
// }
require('dotenv').config({silent:true});
// const DATABASE_URL = process.env.DATABASE_URL ||
//                        global.DATABASE_URL || 
//                        'postgresql://dev:dev@localhost/dev-pairingsdb';
// const TEST_DATABASE_URL = (
// 	process.env.TEST_DATABASE_URL ||
//     'postgresql://dev:dev@localhost/test-pairingsdb');
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