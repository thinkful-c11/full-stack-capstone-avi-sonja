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
  let htmlDisplay;
  if(state.showPairingsList===true){
    state.pairingsList.forEach(element => {
      htmlDisplay += ``
    }); 
    $('.student-pairings-chart').html();
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
    url: '/todays_pairs',
    type: 'GET',
    dataType: 'json',
    success: function(json){
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