//APP INITIALISES
const appState={
    pairingsList=[],
    showPairingsList=true;
};
//STATE MODS
function initialisePairsPage(state){
    state.showPairingsList=true;
}
//RENDER
function render(state){
    let presentPairingsList='';
    if(state.showPairingsList===true){
        $('.student-pairings-chart').html();
        //state.showPairingsList
    }
    else{
        presentPairingsList+='<p>No pairings</p>';
    }
}
//EVENT HANDLERS
function eventHandlers(){
    $(document).ready(function){
        $('.student-pairings-chart').ready(function(event){
            
        })
    }
    render(appState);
}
//RUN THIS CUTENESS
$(function(){
    eventHandlers();
    render(appState,'');
});