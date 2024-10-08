import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from src.config.config import DevConfig, ProdConfig

from src.utils.error_util import register_error_handlers
from src.middlewares.auth import verify_token

db = SQLAlchemy()
migrate = Migrate()

def init_server():
    server = Flask(__name__)

    env = os.getenv("ENV", "prod")
    if env == "prod":
        server.config.from_object(ProdConfig)
    else:
        server.config.from_object(DevConfig)
    
    db.init_app(server)
    migrate.init_app(server, db)

    @server.before_request
    def check_token():
        # Call the token verification function before every request
        return verify_token()

    from src.routes import api
    server.register_blueprint(api, url_prefix="/api/v1")

    register_error_handlers(server)

    return server