import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from src.config.config import DevConfig, ProdConfig
from src.routes import api
from src.utils.error_util import register_error_handlers

def init_server():
    server = Flask(__name__)

    env = os.getenv("ENV", "prod")
    if env == "prod":
        server.config.from_object(ProdConfig)
    else:
        server.config.from_object(DevConfig)
    
    # sql alchemy instance
    db = SQLAlchemy(server)

    # Flask Migrate instance to handle migrations
    migrate = Migrate(server, db)

    server.register_blueprint(api, url_prefix="/api/v1")

    register_error_handlers(server)

    return server, db