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
        state.showPairingsList
    }
    else{
        presentPairingsList+='<p>No pairings</p>';
    }
}
//EVENT HANDLERS
function eventHandlers(){
    $(document).ready(function){
        console.log("Testing!")
    }
    render(appState);
}
//RUN THIS CUTENESS
$(function(){
    eventHandlers();
    render(appState,'');
});