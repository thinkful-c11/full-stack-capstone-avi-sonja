'use strict';

//APP INITIALISES
const appState={
  pairingsList:[],
  showPairingsList:true,
};
//STATE MODS
function initialisePairsPage(state){
  state.showPairingsList=true;
}
//RENDER
function render(state){
  let presentPairingsList='';
  let htmlDisplay='';
  let dailyExpectedRating=''; //This is the expected overall rating of all pairs that day
  if(state.showPairingsList===true){
    state.pairingsList.forEach(element => {
      htmlDisplay += `<div class="show-admin-chart"><div class="partner-cycle-id">${element.cycles_id}</div><div class="partner-1-id grid">${element.id1}</div><div class="partner-2-id grid">${element.id2}</div><div class="partner-1-name grid">${element.name1}</div><div class="partner-2-name grid">${element.name2}</div><div class="parter-ratings">${element.rating}</div><div class="partner-rating-comments">${element.rating_comment}</div></div>`
      //htmlDisplay += `<p>Please work!</p>`
      //console.log("This is partner 1: " + element.name1);
      //console.log("This is partner 2: " + element.name2);
      //console.log("This is the partner rating: " + element.rating);
      dailyExpectedRating=`<div class="over-rating-notice"><p>The overall rating for today is: ${element.expected_rating}</p></div>`
      //console.log("This is the render: " + htmlDisplay);
    }); 
    $('.admin-dashboard-chart').html(htmlDisplay);
        //state.showPairingsList
  }
  else{
    presentPairingsList+='<p>No pairings</p>';
  }
}
//EVENT HANDLERS
function eventHandlers(){
  render(appState);
}
//localhost:8080/cohort_members
function getContents(){
  $.ajax({
    url: '/admin/todays_pairs/',
    type: 'GET',
    dataType: 'json',
    success: function(json){
      //console.log("These are the pairings: " + json);
      console.log(json);
      appState.pairingsList=json;
      render(appState);
    },
        // success: function(result){
        //     $('.student-pairings-chart').html(result);
  });
}
// let testShowing;
// $.get('/todays_pairs', function(result){
//     testShowing=result;
// })
// $.getJSON('/server.js', function(){
    
// })
// $(.student-pairings-chart).load('/');
// console.log(response);

//RUN THIS CUTENESS
$(function(){
  eventHandlers();
  getContents();
  render(appState,'');
});