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

// Load the story in the textarea into our engine
function loadStory() {
    // Set up variables
    JSONtextarea = document.getElementById("advTA");
    RawJSON = JSONtextarea.value;
    
    storyHeader = document.getElementById("storyHeader");
    storyBlurb = document.getElementById("storyBlurb");

    loadContainer = document.getElementById("loadAdventureContainer");
    storyContainer = document.getElementById("storyEngineContainer");

    // Load our story into an object
    s = JSON.parse(RawJSON);

    // Set our header and blurb
    storyHeader.innerHTML = s.title;
    storyBlurb.innerHTML = "by "+s.author;

    // Hide load div and show story div
    loadContainer.style.display = "none";
    storyContainer.style.display = "block";
}