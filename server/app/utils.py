import uuid
import base64

def generate_room_id():
    uuid_str = str(uuid.uuid4())
    encoded_id = base64.urlsafe_b64encode(uuid_str.encode())
    return encoded_id[:5]