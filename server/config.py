import os

class Config:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    CLIENT_BUILD_DIR = os.path.join(BASE_DIR, '..', 'client', 'dist')
    ASSETS_DIR = os.path.join(CLIENT_BUILD_DIR, 'assets')
    SOCKETIO_CORS_ALLOWED_ORIGINS = ["*", "http://127.0.0.1:5000"]
    FLASK_HOST = 'localhost'
    FLASK_PORT = 5000
