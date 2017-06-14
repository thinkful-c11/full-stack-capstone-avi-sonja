'use strict';
const express=require('express');
const app=express();
const{DATABASE,PORT}=require('./config');
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

//GET all students in a cohort by cohort id
app.get('/cohort_members/:cid', (req, res)=>{
  knex('cohort_members')
    .where('cohort_id', req.params.cid)
    .then(results => res.json(results));
});


app.get('/todays_pairs', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3', 'expected_rating')
   .from('set_of_pairs')
   .where('current', 'true')
   .then(results => {
     console.log(results[0]);
     return knex('pairings').whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            .then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});

app.get('/todays_pairs/:id', (req, res)=>{
  knex.select('pair1', 'pair2', 'pair3', 'expected_rating')
   .from('set_of_pairs')
   .where('id', req.params.id)
   .then(results => {
     console.log(results[0]);
     return knex('pairings').whereIn('id', [results[0].pair1, results[0].pair2, results[0].pair3])
            .then(res2 => (Object.assign({'expected_rating':results[0].expected_rating},res2)))
            .then(res3 => res.json(res3));
   });
});

// //POST
app.post('/cohort_members',(req,res)=>{
  knex('cohort_members').insert(req.body)
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

app.listen(PORT || 8080);