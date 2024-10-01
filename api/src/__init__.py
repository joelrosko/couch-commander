import os
from flask import Flask
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from src.config.config import DevConfig, ProdConfig

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

    return server, db