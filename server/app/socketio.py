from flask_socketio import SocketIO, join_room, leave_room, send
from .utils import generate_room_id
from config import Config

socketio = SocketIO(cors_allowed_origins=Config.SOCKETIO_CORS_ALLOWED_ORIGINS)

@socketio.on('connect')
def on_join():
    room_id = generate_room_id()
    print(f'user connected! room: {room_id}')
    join_room(room_id)
    send(f'user has entered the room.', to=room_id)


@socketio.on('keystroke')
def on_keystroke(data):
    print(f'keystroke: {data}')
    send(data, broadcast=True)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room_id = data['room_id']
    leave_room(room_id)
    send(f'{username} has left the room', to=room_id)