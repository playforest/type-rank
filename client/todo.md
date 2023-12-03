* server:
[ ] serve page from flask
[ ] implement socketio

## databases:


* client:
## socket stuff:
[*] update 'current room' id upon joining said room
[*] receive messages from multiplayer room and log to console
[ ] update 'opponent' stats with data received in message packets 
[ ] leave room 
[ ] max participants

* prompt:
[*] render passage
[*] basic keydown event and input, cursor state mgt
[*] implement basic color-based progress tracker
[*] red letter alert on incorrect keypress
[*] remove errors with backspacing
[*] wpm calculation
[*] accuracy
[*] restart
[ ] highlight incorrect spaces

* stats:
[*] change font of kpis
[*] add placeholder for opponent stats 

* good to have:
[*] smooth sliding of underline cursor
[*] multiline passages
[ ] move css to static files
[ ] only load prompt after static font is downloaded

* bugs:
[*] 'fl' are rendered in seperate spans but one's width subsumes the other
[ ] cursor continues to be incremented with multiple correct keypresses
[ ] when backspacing, cursor 1 step ahead of actual key to be removed
[ ] cursor goes to top left upon finishing passage