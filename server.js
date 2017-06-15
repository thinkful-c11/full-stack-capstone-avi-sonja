'use strict';
const express=require('express');
const app=express();
const {DATABASE,PORT} =require('./config');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const knex=require('knex')(DATABASE);
//const{Pairing}=require('./models.js');
app.use(express.static('public'));


// //GET
// // Does this work?
// app.get('/',(req,res)=>{
//   res.send.('Rabbits Cheesecake Cutethings'); 
// });

//GET all students from the cohort table
app.get('/cohort_members',(req,res)=>{
  knex('cohort_members')
      .then(results=>res.json(results));
});

//GET all active students from the cohort table
app.get('/cohort_members/active',(req,res)=>{
  knex('cohort_members')
      .where('active', 'true')
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

app.get('/cohort_members/indiv/:id', (req, res)=> {
  knex('cohort_members')
    .where('id', req.params.id)
    .then(results => res.json(results));
});

app.get('/todays_pairs', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('current', 'true')
   .then(results => {
     console.log(results[0]);
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
     console.log(results[0]);
     return knex('pairings').select('name1', 'name2')
            .whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});


//GET the current day's pairing
app.get('/admin/todays_pairs/', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('current', 'true')
   .then(results => {
     console.log(results[0]);
     return knex('pairings')
            .whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            //.then(res2 => (Object.assign({'expected_rating':results[0].expected_ratres2)))
            .then(res3 => res.json(res3));
   });
});

//GET the pairing by ID of set of pairs
app.get('/admin/todays_pairs/:id', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3')
   .from('set_of_pairs')
   .where('id', req.params.id)
   .then(results => {
     console.log(results[0]);
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
    console.log(req.body);
    knex('cohort_members').insert(req.body)
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
      .then(results => res.json(results));
  }
});

// DELETE - softly
app.delete('/cohort_members/:id', (req,res) =>{
  knex('cohort_members')
    .where('id', req.params.id)
    .update('active', 'false')
    .then(results => res.json(results));
});

// //PUT
// app.put('/cohort_members/:id',(req,res)=>{
     
// });
// //DELETE
// app.delete('/cohort_members/:id',(req,res)=>{
//     Pairing
//     .findByIdAndRemove(req.params.id)
//     .exec()
//     .then(user=>res.status(204).end())
//     .catch(err=>{
//         console.error(err);
//         res.status(500).json({message:'Internal server error try again'});
//     });
// });


app.listen(PORT || 8080,function(){console.log("This is now listening");});