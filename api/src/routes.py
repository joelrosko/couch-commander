from flask import Blueprint
from src.controllers.lights_controller import lights

api = Blueprint('api_v1', __name__)

api.register_blueprint(lights, url_prefix="/lights")