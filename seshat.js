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
var currentEvent;

// When continue button is pressed on intro intersitial page
// Start the story
function processEvent() {
    curA = 0;
    currentEvent = s.events[curE];
    // Load event title and description
    storyHeader.innerHTML = currentEvent.header;
    storyDesc.innerHTML = currentEvent.description;

    // Switch container views
    introContainer.style.display = "none";
    if (currentEvent.image != "") {
        headerImage.src = currentEvent.image;
    } else {
        headerImage.src = s.image;
    }
    storyContainer.style.display = "block";

    actionsContainer.innerHTML="";

    // Load actions for specific event
    for (i = 0; i < Object.keys(currentEvent.actions).length; i++) { 

        // If double event
        if (currentEvent.actions[i].special == "random") {
            actionsContainer.innerHTML+=("<a href='#' onclick='randomEvent("+i+");'>"+currentEvent.actions[i].text+"</a><br>");
        } else if (currentEvent.actions[i].response != "" && currentEvent.actions[i].warp != "") {
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponseWarp("+i+","+currentEvent.actions[i].warp+");'>"+currentEvent.actions[i].text+"</a><br>");
        } else if (currentEvent.actions[i].response != "") { // If quick respond event
            actionsContainer.innerHTML+=("<a href='#' onclick='quickResponse("+i+");'>"+currentEvent.actions[i].text+"</a><br>");
        } else if (currentEvent.actions[i].warp != "") { // If warp event
            actionsContainer.innerHTML+=("<a href='#' onclick='warp("+currentEvent.actions[i].warp+");'>"+currentEvent.actions[i].text+"</a><br>");
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
    successMsg = currentEvent.actions[num].rngSuccessMsg;
    failMsg = currentEvent.actions[num].rngFailMsg;
    thresh = currentEvent.actions[num].rngSuccessRate;
    randomNumber = Math.floor(Math.random() * 101);
    if (randomNumber <= thresh) {
        alert(successMsg);
        warp(currentEvent.actions[num].rngSuccess);
    } else {
        alert(failMsg);
        warp(currentEvent.actions[num].rngFail);
    }
}

// Warp to action warp
function warp(num) {
    curE = num;
    processEvent();
}