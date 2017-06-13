'use strict';

const express = require('express');
const app = express();
const {DATABASE,PORT}=require('./config');
const knex=require('knex')(DATABASE);

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);