# What is Seshat?
Seshat is a Text Adventure Engine written in vanilla JavaScript. It takes a JSON storyfile created by the user and allows them to play it in a classic "choose your own adventure" style.

# Storyfile Format
Storyfiles follow the JSON (JavaScript Object Notation) format. The data structure for the Storyfiles is constantly changing during development, so this documentation may be out of date.

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
```response```: message to display

### Warp
Warp Actions are for when you want to move a player to another Event upon clicking an outcome. These can be used in conjunction with a Quick Response Action.\
A Warp Action will be created if the ```warp``` key has a value.
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
```warp```: event ID to warp to