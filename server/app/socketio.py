from flask_socketio import SocketIO, join_room, leave_room, send, emit
from .utils import generate_room_id, generate_username
from config import Config

socketio = SocketIO(cors_allowed_origins=Config.SOCKETIO_CORS_ALLOWED_ORIGINS)

@socketio.on('connect')
def handle_connect(params):
    print(f'params: {params}')
    room_id = generate_room_id()
    username = generate_username()
    join_room(room=room_id)
    emit('user_room_assigned', {'username': username, 'room_id': room_id})
    print(f'{username} connected! room: {room_id}')

@socketio.on('custom_connect_event')
def handle_custom_connect_event(data):
    print(f'{data}')

@socketio.on('join')
def handle_join(data):
    print(f'handle join data: {data}')
    username = data['username']
    room_id = data['room_id']
    join_room(room_id)
    send(f'User has joined the room{room_id}', to=room_id)
    print(f'User has joined room: {room_id}')

@socketio.on('keystroke')
def handle_keystroke(data):
    print(f'keystroke: {data}')
    emit('keystroke',data, to=data['room_id'])


@socketio.on('leave')
def handle_leave(data):
    # username = data['username']
    room_id = data['room_id']
    leave_room(room_id)
    print(f'User has left the room: {room_id}')
    send(f'username has left the room', to=room_id)