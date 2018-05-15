/*
Seshat Choose Your Own Adventure Engine
seshat.js | Main Game Engine Script
Max Pereira
*/

// Debug function to set the textarea contents to our demo story
window.onload = function() {
    // storytext is set in debug.txt to be the contents of sample-adventure.json
    document.getElementById("advTA").value = storytext;
};

var s; // our global story object

// Load the story in the textarea into our engine
function loadStory() {
    // Set up variables
    JSONtextarea = document.getElementById("advTA");
    RawJSON = JSONtextarea.value;
    // Load our story into an object
    s = JSON.parse(RawJSON);

    // Create some variables that we can manipulate
    headerImage = document.getElementById("headerImage");
    introHeader = document.getElementById("introHeader");
    introAuthor = document.getElementById("introAuthor");
    introDesc = document.getElementById("introDesc");

    storyHeader = document.getElementById("storyHeader");
    storyDesc = document.getElementById("storyDesc");

    loadContainer = document.getElementById("loadAdventureContainer");
    introContainer = document.getElementById("introContainer");
    actionsContainer = document.getElementById("actionsContainer");

    // Set up our intro intersitial page
    introHeader.innerHTML = s.title;
    introAuthor.innerHTML = "by "+s.author;
    introDesc.innerHTML = s.description;

    // Hide load div and show intro div
    loadContainer.style.display = "none";
    headerImage.src = s.image;
    introContainer.style.display = "block";
}

var curE = 0; // global current event ID
var currentEvent; // JSON object of the current event

// Render the page for the current event
function processEvent() {
    currentEvent = s.events[curE];
    
    // Render event title and description
    storyHeader.innerHTML = currentEvent.header;
    storyDesc.innerHTML = currentEvent.description;

    // Switch container view to event container
    introContainer.style.display = "none";
    if (currentEvent.image != "") {
        headerImage.src = currentEvent.image;
    } else {
        headerImage.src = s.image;
    }
    storyContainer.style.display = "block";

    // Clear the actions container before rendering actions
    actionsContainer.innerHTML="";

    // Render actions onto page
    for (curA = 0; curA < Object.keys(currentEvent.actions).length; curA++) { 
        currentAction = currentEvent.actions[curA];
        if (currentAction.special == "random") { // If special random event
            actionsContainer.innerHTML+=("<a href='#' onclick='randomEvent("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.special == "puzzle") {
            actionsContainer.innerHTML+=("<a href='#' onclick='puzzleEvent("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.response != "" && currentAction.warp != "") { // If double event
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponseWarp("+curA+","+currentAction.warp+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.response != "") { // If quick respond event
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponse("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.warp != "") { // If warp event
            actionsContainer.innerHTML+=("<a href='#' onclick='warp("+currentAction.warp+");'>"+currentAction.text+"</a><br>");
        }
    }
}

// Handle double events
function quickResponseWarp(num) {
    quickResponse(num);
    warp(currentEvent.actions[num].warp);
}

// Show quick response action message
function quickResponse(num) {
    alert(currentEvent.actions[num].response);
}

// Random event handler
function randomEvent(num) {
    currentAction = currentEvent.actions[num];
    successMsg = currentAction.successMsg;
    failMsg = currentAction.failMsg;
    thresh = currentAction.rngSuccessRate;
    randomNumber = Math.floor(Math.random() * 101);
    if (randomNumber <= thresh) {
        alert(successMsg);
        warp(currentAction.warpSuccess);
    } else {
        alert(failMsg);
        warp(currentAction.warpFail);
    }
}

function puzzleEvent(num) {
    currentAction = currentEvent.actions[num];
    var puzzlePrompt = prompt(currentAction.response,"Enter your answer...");
    if (puzzlePrompt == currentAction.meta) {
        alert(currentAction.successMsg);
        warp(currentAction.warpSuccess);
    } else {
        alert(currentAction.failMsg);
        warp(currentAction.warpFail);
    }
}

// Warp to action warp
function warp(num) {
    curE = num;
    processEvent();
}