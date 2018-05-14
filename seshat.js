/*
Seshat Choose Your Own Adventure Engine
seshat.js | Main Game Engine Script
Max Pereira
*/

function loadStory() {
    storyRawJSON = document.getElementById("advTA").value;
    s = JSON.parse(storyRawJSON);
    alert("Found " + s.seshat.title + " by " + s.seshat.author);
}