from flask import Blueprint
from src.controllers.lights_controller import lights
from src.controllers.light_controller import light

api = Blueprint('api_v1', __name__)

# Route for single light
api.register_blueprint(light, url_prefix="/light")

# Route for multiple lights
api.register_blueprint(lights, url_prefix="/lights")