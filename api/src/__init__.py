import os
from flask import Flask
from dotenv import load_dotenv

from src.config.config import DevConfig, ProdConfig

def init_server():
    server = Flask(__name__)

    env = os.getenv("ENV", "prod")
    if env == "prod":
        server.config.from_object(ProdConfig)
    else:
        server.config.from_object(DevConfig)

    @server.route("/")
    def home():
        return "<h1>TEST HEJ</h1>"

    return server