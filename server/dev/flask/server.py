from flask import Flask, render_template
from flask_socketio import SocketIO, send, join_room, leave_room


app = Flask(__name__)
app.config['SECRET_KEY'] = "secret!123"
socketio = SocketIO(app, cors_allowed_origins=["*", "http://127.0.0.1:5000"])

@app.route("/")
def index():
    return render_template("index.html")
@socketio.on('message')
def handle_message(message):
    print(f'received message: {message}')

    if message != "User connected!":
        send(message, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


if __name__ == '__main__':
    socketio.run(app, host="localhost", port=5000)