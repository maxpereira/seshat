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

// When continue button is pressed on intro intersitial page
// Start the story
function startStory() {
    curA = 0;
    currentEvent = s.events[curE];
    // Load event title and description
    storyHeader.innerHTML = currentEvent.header;
    storyDesc.innerHTML = currentEvent.description;

    // Switch container views
    introContainer.style.display = "none";
    headerImage.src = currentEvent.image;
    storyContainer.style.display = "block";

    // Load actions for specific event
    for (i = 0; i < Object.keys(currentEvent.actions).length; i++) { 
        alert(currentEvent.actions[i].text);
        if (currentEvent.actions[i].response != null) {
            alert(i+" is a quick respond event");
        }
        if (currentEvent.actions[i].warp != null) {
            alert(i+" is a warp event");
        }
    }
}