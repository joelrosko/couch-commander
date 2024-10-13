from flask import Blueprint, request

from src.middlewares.auth import token_required
from src import db
from src.models.house import House
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

house = Blueprint("house", __name__)

@house.route("/name", methods=["GET"])
@token_required
def get_house_name():
    try:
        house_table = House.query.first()
        data = {"Name": house_table.name}

        return build_response(data=data, status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(message="Server error", status=500)

@house.route("/name", methods=["PUT"])
@token_required
def update_house_name():
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No body data included",
                status_code=400
            )

            return build_response(message="no body data included", status=400)

        if "name" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="The key: name, was not included",
                status_code=400
            )

            return build_response(error="'name' of house must be provided", status=400)

        house_name = body["name"]

        if not isinstance(house_name, str):
            log_errors_to_db(
                endpoint=request.path,
                error_message="The data was not of type string",
                status_code=400
            )

            return build_response(error="'name' of house must be of type string", status=400)

        if len(house_name) <= 0 or len(house_name) > 40:
            log_errors_to_db(
                endpoint=request.path,
                error_message="The name was not within 1-40 characters",
                status_code=400
            )

            return build_response(error="'name' must be between 1 - 40 chars", status=400)

        house_table = House.query.first()
        if not house_table:
            log_errors_to_db(
                endpoint=request.path,
                error_message="The house table was not found within db",
                status_code=500
            )

            return build_response(error="House table not found", status=404)

        house_table.name = house_name
        db.session.commit()

        return build_response(data={"message": "House name updated successfully"}, status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error="Server error", status=500)
