'use strict';
//APP INITIALISES
const appState={
  pairingsList:[],
  showPairingsList:true,
};
//STATE MODS
function initialisePairsPage(){
  appState.showPairingsList=true;
}
//RENDER
function render(){
  let presentPairingsList='';
  let htmlDisplay='';
  let dailyExpectedRating=''; //This is the expected overall rating of all pairs that day
  if(appState.showPairingsList===true){
    appState.pairingsList.forEach(element => {
      if(element.active===true){
        htmlDisplay += `<div class="show-admin-chart"><div class="grid remove-student-option"><span class="X"><button data-rabbits="${element.id}" class="remove-student-row" type="button">☒</button></span></div><div class="user-user-id grid">${element.id}</div><div class="user-name-first grid">${element.first_name}</div><div class="user-name-last grid">${element.last_name}</div><div class="user-cohort-id grid">${element.cohort_id}</div><div class="user-user-location grid">${element.location}</div></div>`;
      }
    }); 
    $('.concept-users-chart').html(htmlDisplay);
  }
  else{
    presentPairingsList+='<p>No pairings</p>';
  }
}
//EVENT HANDLERS
function eventHandlers(){
  $('.create-add-user-form').submit(function(event) {
    event.preventDefault();
    const first_name = $('#user-first-name').val();
    const last_name=$('#user-last-name').val();
    const cohort_id=$('#user-cohort-id').val();
    const location=$('#user-location').val();
    const data = {first_name, last_name, cohort_id, location};
    $.ajax({
      url: '/cohort_members',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(json){
        appState.pairingsList.push(json[0]);
        render(appState);
      },
    });
    render(appState);
  });
  $('.create-update-user-form').submit(function(event) {
    event.preventDefault();
    const id = $('#student-user-id').val();
    const location=$('#student-user-location').val();
    const data = {id, location};
    $.ajax({
      url: `/cohort_members/${id}`,
      dataType: 'json',
      type: 'put',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(json){
        // console.log(json);
      },
    });
    appState.pairingsList.forEach(element=>{
      if(element.id==data.id){
        element.location=data.location;
      }
    });
    render(appState);
  });
  $('.concept-users-chart').on('click','.remove-student-row', function(event){
    event.preventDefault();
    let rabbits=$(this).data('rabbits');
    $.ajax({
      url: `/cohort_members/${rabbits}`,
      type: 'delete',
      contentType: 'application/json',
      success: function(json){
        // console.log(json);
      }
    });
    appState.pairingsList.forEach(element =>{
      if(element.id===rabbits){
        element.active=false;
      }
    });
    render(appState);
  });
  render(appState);
}
//localhost:8080/cohort_members
function getContents(){
  $.ajax({
    url: '/cohort_members/active',
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