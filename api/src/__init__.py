import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from src.config.config import DevConfig, ProdConfig

db = SQLAlchemy()
migrate = Migrate()

def init_server():
    server = Flask(__name__)

    CORS(server, origins=[os.getenv("CORS_ORIGIN")])

    env = os.getenv("ENV", "prod")
    if env == "prod":
        server.config.from_object(ProdConfig)
    else:
        server.config.from_object(DevConfig)

    db.init_app(server)
    migrate.init_app(server, db)

    from src.routes import api
    server.register_blueprint(api, url_prefix="/api/v1")

    from src.utils.error_util import register_error_handlers
    register_error_handlers(server)

    return server