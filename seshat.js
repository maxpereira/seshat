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
    
    introHeader = document.getElementById("introHeader");
    introAuthor = document.getElementById("introAuthor");
    introDesc = document.getElementById("introDesc");

    loadContainer = document.getElementById("loadAdventureContainer");
    introContainer = document.getElementById("introContainer");

    // Load our story into an object
    s = JSON.parse(RawJSON);

    // Set our header and blurb
    introImage.src = s.image;
    introHeader.innerHTML = s.title;
    introAuthor.innerHTML = "by "+s.author;
    introDesc.innerHTML = s.description;

    // Hide load div and show intro div
    loadContainer.style.display = "none";
    introContainer.style.display = "block";
}

function loadEvent() {

}