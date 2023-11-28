document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect("http://127.0.0.1:5000");

    socket.on('connect', function() {
        socket.send("User connected!");
    });

    socket.on('message', function(data) {
        var messages = document.getElementById('messages');
        var newMessage = document.createElement('p');
        newMessage.textContent = data;
        messages.appendChild(newMessage);
    });

    var joinBtn = document.getElementById('joinRoom');
    joinBtn.addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var room = document.getElementById('room').value;

        socket.emit('join', {username, room})
    })

    var sendBtn = document.getElementById('sendBtn');
    sendBtn.addEventListener('click', function() {

        var username = document.getElementById('username').value;
        var message = document.getElementById('message').value;

        console.log(`message to send: ${message}`)

        if (message.length > 0) {
                socket.send(username + ': ' + message);
        document.getElementById('message').value = '';
        }

    });
});