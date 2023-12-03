import uuid
import random
import base64

def generate_room_id():
    uuid_str = str(uuid.uuid4())
    return uuid_str[:5]

def generate_username():
    adjectives = ["quick", "lazy", "happy", "sad", "bright", "dark"]
    nouns = ["fox", "dog", "cat", "bird", "tree", "star"]
    adj = random.choice(adjectives)
    noun = random.choice(nouns)
    number = random.randint(100, 999)
    return f'{adj}{noun}{number}'