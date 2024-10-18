from flask import Blueprint, request
from aiohttp import ClientResponseError, ClientError

from src.middlewares.auth import token_required
from src.services.deconz_service import get_from_deconz, put_to_deconz
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

lights = Blueprint("lights", __name__)

# Route to get added lights
# /api/v1/lights/list
@lights.route("/list", methods = ["GET"])
@token_required
async def get_lights():
    try:
        endpoint = "/lights"
        response = await get_from_deconz(endpoint=endpoint)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=e.status
        )

        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error="Server error", status=500)

# Route to add new lights
# /api/v1/lights/add
@lights.route("/add", methods = ["PUT"])
@token_required
async def add_lights():
    try:
        endpoint = "/config"
        payload = {"permitjoin": 60}
        response = await put_to_deconz(endpoint=endpoint, payload=payload)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=e.status
        )

        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(error="Server error", status=500)