'use strict';
const express=require('express');
const app=express();
const knex=require('knex')(DATABASE);
const{DATABASE,PORT}=require('./config');
const{Pairing}=require('./models.js');
app.use(express.static('public'));
// //GET
// // Does this work?
// app.get('/',(req,res)=>{
//   res.send.('Rabbits Cheesecake Cutethings'); 
// });
// app.get('/cohort_members',(req,res)=>{
//     knex.select('*')
//         .from('cohort_members')
//         .then(results=>res.json(results));
// });
// //POST
// app.post('/cohort_members',(req,res)=>{
//     knex.select('first_name','last_name','cohort_id','location')
// });
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
app.listen(process.env.PORT || 8080);