from flask import Flask
from .socketio import socketio
from .routes import main
from config import Config



def create_app():
    app = Flask(__name__,
                static_folder=Config.ASSETS_DIR,
                template_folder=Config.CLIENT_BUILD_DIR)

    app.config.from_object(Config)

    socketio.init_app(app)

    app.register_blueprint(main)

    return app
