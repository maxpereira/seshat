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
    storyRawJSON = document.getElementById("advTA").value;
    s = JSON.parse(storyRawJSON);
    alert("Found " + s.seshat.title + " by " + s.seshat.author);
}