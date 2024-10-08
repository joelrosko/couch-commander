from flask import Blueprint, request

from src import db
from src.models.house import House
from src.utils.response_util import build_response

house = Blueprint("house", __name__)

@house.route("/name", methods=["GET"])
def get_house_name():
    try:
        house_table = House.query.first()
        data = {"Name": house_table.name}

        return build_response(data=data, status=200)
    except Exception:
        return build_response(message="Server error", status=500)

@house.route("/name", methods=["PUT"])
def update_house_name():
    try:
        try:
            body = request.get_json()
        except Exception:
            return build_response(message="no body data included", status=400)
        
        if "name" not in body:
            return build_response(error="'name' of house must be provided", status=400)
        
        house_name = body["name"]

        if not isinstance(house_name, str):
            return build_response(error="'name' of house must be of type string", status=400)
        
        if len(house_name) <= 0 or len(house_name) > 40:
            return build_response(error="'name' must be between 1 - 40 chars", status=400)
        
        house_table = House.query.first()
        if not house_table:
            return build_response(error="House table not found", status=404)
        
        house_table.name = house_name
        db.session.commit()

        return build_response(data={"message": "House name updated successfully"}, status=200)
    except Exception:
        return build_response(error="Server error", status=500)
