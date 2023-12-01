import uuid
import base64

def generate_room_id():
    uuid_str = str(uuid.uuid4())
    return uuid_str[:5]