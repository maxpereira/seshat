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
```image```: Contains a link to the header image you want to use for that event
```header```: Title of event, usually used for displaying the name of a room or area
```description```: A little blurb that describes the room or area
```actions```: A list of actions the user can take during this event (see Actions below)

## Actions