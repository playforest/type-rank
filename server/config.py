import os

class Config:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    CLIENT_BUILD_DIR = os.path.join(BASE_DIR, '..', 'client', 'dist')
    ASSETS_DIR = os.path.join(CLIENT_BUILD_DIR, 'assets')