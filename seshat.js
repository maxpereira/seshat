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
    headerImage.src = s.image;
    introHeader.innerHTML = s.title;
    introAuthor.innerHTML = "by "+s.author;
    introDesc.innerHTML = s.description;

    // Hide load div and show intro div
    loadContainer.style.display = "none";
    introContainer.style.display = "block";
}

var curE = 0; // global current event ID

// When continue button is pressed on intro intersitial page
// Start the story
function startStory() {

    introContainer.style.display = "none";
    storyContainer.style.display = "block";

    headerImage.src = s.events[curE].image;
    storyHeader.innerHTML = s.events[curE].header;
    storyDesc.innerHTML = s.events[curE].description;
}