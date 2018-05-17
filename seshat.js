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
            actionsContainer.innerHTML+=("<a href='#' onclick='randomAction("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.special == "key") {
            actionsContainer.innerHTML+=("<a href='#' onclick='keyActionContinue("+curA+");'>"+currentAction.text+"</a> (KEY)<br>");
        } else if (currentAction.special == "locked") {
            lockedAction(curA);
        } else if (currentAction.special == "puzzle") {
            actionsContainer.innerHTML+=("<a href='#' onclick='puzzleAction("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.response != null && currentAction.warp != null) { // If double event
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponseWarp("+curA+","+currentAction.warp+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.response != null) { // If quick respond event
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponse("+curA+");'>"+currentAction.text+"</a><br>");
        } else if (currentAction.warp != null) { // If warp event
            actionsContainer.innerHTML+=("<a href='#' onclick='warp("+currentAction.warp+");'>"+currentAction.text+"</a><br>");
        }
    }
}

// Handler for QR + warp events
function quickResponseWarp(num) {
    quickResponse(num);
    warp(currentEvent.actions[num].warp);
}

// Handler for quick response actions
function quickResponse(num) {
    alert(currentEvent.actions[num].response);
}

// Handler for random actions
function randomAction(num) {
    currentAction = currentEvent.actions[num];
    successMsg = currentAction.successMsg;
    failMsg = currentAction.failMsg;
    thresh = currentAction.meta;
    randomNumber = Math.floor(Math.random() * 101);
    if (randomNumber <= thresh) {
        alert(successMsg);
        warp(currentAction.warpSuccess);
    } else {
        alert(failMsg);
        warp(currentAction.warpFail);
    }
}

// Handlers for locked actions

// Render locked actions
function lockedAction(num) {
    currentAction = currentEvent.actions[num];
    if (currentEvent.locked == currentAction.lockCount) {
        actionsContainer.innerHTML+=("<a href='#' onclick='lockedActionContinue("+num+");'>"+currentAction.text+"</a> (UNLOCKED)<br>");
    } else {
        actionsContainer.innerHTML+=("<a href='#' onclick='alert(\"This action is locked.\")'>"+currentAction.text+"</a> (LOCKED)<br>");
    }
}

// Handles when an unlocked locked action is clicked
function lockedActionContinue(num) {
    currentAction = currentEvent.actions[num];
    if (currentAction.response != null && currentAction.warp != null) { // If double event
        quickResponseWarp(num);
    } else if (currentAction.response != null) { // If quick respond event
        quickResponse(num);
    } else if (currentAction.warp != null) { // If warp event
        warp(currentAction.warp);
    }
}

// Actually unlock (when clicking a key action)
function keyActionContinue(num) {
    currentAction = currentEvent.actions[num];
    targetEvent = currentAction.targetEvent;
    if (s.events[targetEvent].locked == "0") {
        if (currentAction.obtained == "0") {
            currentAction.obtained = "1";
            s.events[targetEvent].locked = "1";
            quickResponse(num);
        } else {
            alert("You've already used this action.");
        }
    } else {
        alert("You've already used this action.");
    }
}

// Handler for puzzle actions
function puzzleAction(num) {
    currentAction = currentEvent.actions[num];
    var puzzlePrompt = prompt(currentAction.response,"");
    if (puzzlePrompt == currentAction.meta) {
        alert(currentAction.successMsg);
        warp(currentAction.warpSuccess);
    } else {
        alert(currentAction.failMsg);
        warp(currentAction.warpFail);
    }
}

// helper function for warp events
function warp(num) {
    curE = num;
    processEvent();
}