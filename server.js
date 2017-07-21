'use strict';
const express=require('express');
const app=express();
const {DATABASE,PORT} =require('./config');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use(express.static('public'));


//GET all students from the cohort table
app.get('/cohort_members',(req,res)=>{
  knex('cohort_members')
      .orderBy('id')
      .then(results=>res.json(results));
});

//GET all active students from the cohort table
app.get('/cohort_members/active',(req,res)=>{
  knex('cohort_members')
      .where('active', 'true')
      .orderBy('id')
      .then(results=>res.json(results));
});


//GET all active students in a cohort by cohort id
app.get('/cohort_members/:cid', (req, res)=>{
  knex('cohort_members')
    .where({
      'cohort_id': req.params.cid,
      'active':true
    }).then(results => res.json(results));
});

//GET an individual student by ID
app.get('/cohort_members/indiv/:id', (req, res)=> {
  knex('cohort_members')
    .where('id', req.params.id)
    .then(results => res.json(results));
});

//GET the set of pairings for today's pairing
app.get('/todays_pairs', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('current', 'true')
   .then(results => {
     return knex('pairings').select('name1', 'name2')
            .whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});

//GET the pairing by ID of set of pairs
app.get('/todays_pairs/:id', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('id', req.params.id)
   .then(results => {
     return knex('pairings').select('name1', 'name2')
            .whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});



//GET the current day's pairing with all info in the database
app.get('/admin/todays_pairs/', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('current', 'true')
   .then(results => {
     return knex('pairings')
            .whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_ratres2)))
            .then(res3 => res.json(res3));
   });
});

//GET the pairing by ID of set of pairs with all data in the database
app.get('/admin/todays_pairs/:id', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('id', req.params.id)
   .then(results => {
     return knex('pairings').whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});

//POST a new member to the cohort table 
//curently has the cohort ID hardcoded to be part
//of the current cohort test data
app.post('/cohort_members', jsonParser, (req,res)=>{
  if(!(req.body.cohort_id && req.body.first_name && req.body.last_name )){
    res.status(400).send();
  }
  else{
    knex('cohort_members').insert(req.body)
        .returning(['id','first_name', 'last_name', 'cohort_id', 'location', 'active'])
        .then(results => res.json(results));
  }
});

//Can update the location of a cohort member by id
app.put('/cohort_members/:id', jsonParser, (req, res)=> {
  if(! req.body.location){
    res.status(400).send();
  }
  else{
    knex('cohort_members')
      .update('location', req.body.location)
      .where('id', req.params.id)
      .returning(['id','first_name', 'last_name', 'cohort_id', 'location', 'active'])
      .then(results => res.status(201).json(results));
  }
});

// DELETE - softly
app.delete('/cohort_members/:id', (req,res) =>{
  knex('cohort_members')
    .where('id', req.params.id)
    .update('active', 'false')
    .then(results => res.json(results));
});


let server;
let knex;
function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      knex = require('knex')(database);
      server = app.listen(port, () => {
        console.info(`App listening on port ${server.address().port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return knex.destroy().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = { app, runServer, closeServer };