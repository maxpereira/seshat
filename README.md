![Seshat Adventure Engine](https://i.imgur.com/KLpd2I2.png)

# Seshat Adventure Engine
The Seshat Adventure Engine is a text adventure engine written in vanilla JavaScript. It reads a JSON "storyfile" and allows you to play it in a classic "choose your own adventure" style.

## Storyfiles
Storyfiles are the way you program stories to play using Seshat. They follow the JSON (JavaScript Object Notation) format. **The data structure for the Storyfiles is constantly changing during development, so this documentation may be out of date.**

## Events
Events are the different "rooms" or "areas" that the player can navigate through. Each event is its own unique key in the storyfile. In order for an event to be functional, it must contain the following:
```JSON
    "events": {
        "0": {
            "image": "[Link to image (400x200)]",
            "header": "Porch",
            "description": "You come upon an abandoned house with a locked front door.",
            "actions": {
                "0": {
                    "special": "",     
                    "text": "Kick the door.",
                    "response": "It won't budge.",
                    "warp": ""
                }
            }
        }
    }
```
```image```: contains a link to the header image you want to use for that event  
```header```: title of event, usually used for displaying the name of a room or area  
```description```: a little blurb that describes the room or area  
```actions```: a list of actions the user can take during this event (see Actions below)  

## Actions
Actions are the different choices players can take during events. There are several types of Actions that have different outcomes.

### Quick Response
Quick Response Actions display a message to the player. These can be used in conjunction with Warp Actions.\
A Quick Response Action will be created if the ```response``` key has a value.
```JSON
    "actions": {
        "0": {
            "special": "",     
            "text": "Kick the door.",
            "response": "It won't budge.",
            "warp": ""
        }
    }
```
```special```: not set\
```text```: option message to display\
```response```: message to display on click\
```warp```: not set

### Warp
Warp Actions are for when you want to move a player to another Event upon clicking an outcome. These can be used in conjunction with a Quick Response Action.\
A Warp Action will be created if the ```warp``` key has a value.
```JSON
    "actions": {
        "0": {
            "special": "",     
            "text": "Go inside.",
            "response": "",
            "warp": "2"
        }
    }
```    
```special```: not set\
```text```: option message to display\
```response```: not set\
```warp```: event ID to warp to

### Random
Random Actions are a type of Special Event for when you want a user to have a customizable random chance of failing an outcome.
```JSON
    "actions": {
        "0": {
            "special": "random",
            "text": "Pry it open.",
            "meta": "50",
            "warpSuccess": "2",
            "successMsg": "It's extremely hard to move. It probably hasn't been opened in years. With a great burst of effort, you slide the window open.",
            "warpFail": "0",
            "failMsg": "It's extremely hard to move. It probably hasn't been opened in years. Unfortunately it appears the wood has rotted to the point that this window won't be opening any time soon."
        }
```
```special```: must be set to "random"\
```text```: option message to display\
```response```: not set\
```warp```: not set\
```meta```: success rate in percent (out of 100)\
```warpSuccess```: event ID to warp to on event success\
```successMsg```: message to display on event success\
```warpFail```: event ID to warp to on event fail\
```failMsg```: message to display on event fail

### Puzzle
Puzzle Actions are a type of Special Event for when you want a user to have to enter a password or puzzle answer to continue.
```JSON
    "actions": {
        "0": {
            "special": "puzzle",                      
            "text": "Solve the puzzle.",
            "response": "What goes up when the rain comes down? (all lowercase, one word).",
            "meta": "umbrella",
            "warpSuccess": "3",
            "successMsg": "You got it. You pull out your umbrella and walk out into the rain.",
            "warpFail": "5",
            "failMsg": "Not exactly. You can't go out into the rain without one of these."
        }
```
```special```: must be set to "puzzle"\
```text```: option message to display\
```response```: puzzle or riddle for player to answer (shows in prompt)\
```warp```: not set\
```meta```: answer to puzzle\
```warpSuccess```: event ID to warp to on event success\
```successMsg```: message to display on event success\
```warpFail```: event ID to warp to on event fail\
```failMsg```: message to display on event fail