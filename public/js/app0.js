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
            htmlDisplay += `<div class="show-admin-chart"><div class="partner-cycle-id grid">${element.cycles_id}</div><div class="partner-1-id grid">${element.id1}</div><div class="partner-2-id grid">${element.id2}</div><div class="partner-1-name grid">${element.name1}</div><div class="partner-2-name grid">${element.name2}</div><div class="partner-ratings grid">${element.rating}</div><div class="partner-rating-comments grid">${element.rating_comment}</div></div>`
    }); 
    $('.admin-dashboard-chart').html(htmlDisplay);
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
      appState.pairingsList=json;
      render(appState);
    },
  });
}
//RUN THIS CUTENESS
$(function(){
  eventHandlers();
  getContents();
  render(appState,'');
});