'use strict';

//APP INITIALISES
const appState={
  pairingsList:[],
  showPairingsList:true,
  id:1,
};
//STATE MODS
function initialisePairsPage(state){
  state.showPairingsList=true;
}
//RENDER
function render(state){
  let presentPairingsList='';
  let htmlDisplay='';
  if(state.showPairingsList===true){
    state.pairingsList.forEach(element => {
      htmlDisplay += `<p>${element.name1} `;
      if (element.name2) {
        htmlDisplay += `& ${element.name2}</p>`;
      }
      else{
        htmlDisplay += `</p>`; //</div></div>`;
      }
    }); 
    $('.student-pairings-chart').html(htmlDisplay);
  }
  else{
    presentPairingsList+='<p>No pairings</p>';
  }
}
//EVENT HANDLERS
function eventHandlers(){
  $('.rotate').on('click', function(event){
    (appState.id >= 6) ? appState.id=1: appState.id++;
    getContentsByID(appState.id);
    render(appState);
  });
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
function getContentsByID(id){
  $.ajax({
    url: `/admin/todays_pairs/${id}`,
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
  getContentsByID(appState.id);
  render(appState,'');
});