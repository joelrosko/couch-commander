from flask import Blueprint, request

from src.middlewares.auth import token_required
from src import db
from src.models.light import Light
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

db_lights = Blueprint("db_lights", __name__)

@db_lights.route("/lights", methods=["GET"])
@token_required
def get_all():
    try:
        lights = Light.query.all()

        if len(lights) < 1:
            return build_response(message="No lights added to database", status=200)

        lights_data = [{"id": light.light_id} for light in lights]

        return build_response(data=lights_data, status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(message="Server error", status=500)

@db_lights.route("/lights", methods=["POST"])
@token_required
def add_lights():
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

        if "lights" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: lights",
                status_code=400
            )

            return build_response(error="new lights must be provided", status=400)

        lights = request.get_json("lights")["lights"]
        if len(lights) < 1:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No new lights provided",
                status_code=400
            )

            return build_response(error="no new lights was provided", status=400)

        for light in lights:
            db_item_light = Light(light_id=light, house_id=1)
            db.session.add(db_item_light)

        db.session.commit()

        return build_response(message="Lights added", status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error="Server error", status=500)

@db_lights.route("/lights", methods=["DELETE"])
@token_required
def delete_light():
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

        if "light_id" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: lights_id",
                status_code=400
            )

            return build_response(error="Id of light must be included", status=400)

        light_id = body["light_id"]

        light = Light.query.filter_by(light_id=light_id).first()

        if not light:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Could not find light in db",
                status_code=400
            )

            return build_response(error="Light not found", status=404)

        db.session.delete(light)
        db.session.commit()

        return build_response(data=f"Light was deleted", status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error="Server error", status=500)
