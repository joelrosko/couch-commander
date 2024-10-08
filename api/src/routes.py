from flask import Blueprint
from src.controllers.lights_controller import lights
from src.controllers.light_controller import light
from src.controllers.groups_controller import groups
from src.controllers.db_house_controller import house
from src.controllers.db_lights_controller import db_lights

api = Blueprint('api_v1', __name__)

# Route for single light
api.register_blueprint(light, url_prefix="/light")

# Route for multiple lights
api.register_blueprint(lights, url_prefix="/lights")

# Route for groups of lights
api.register_blueprint(groups, url_prefix="/groups")

# Route for house settings
api.register_blueprint(house, url_prefix="/house")

# Route for db lights
api.register_blueprint(db_lights, url_prefix="/db")