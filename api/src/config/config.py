import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    HOST = "0.0.0.0"
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("DB_TRACK_MODIFICATIONS", False)
    DECONZ_API_URL = os.getenv("DECONZ_API_URL")
    DECONZ_API_KEY = os.getenv("DECONZ_API_KEY")

class DevConfig(Config):
    ENV = "development"
    DEBUG = True
    TESTING = True
    PORT = int(os.getenv("DEV_PORT"))

class ProdConfig(Config):
    ENV = "production"
    DEBUG = False
    TESTING = False
    PORT = int(os.getenv("PROD_PORT"))