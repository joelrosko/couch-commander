from flask import Blueprint
from aiohttp import ClientResponseError, ClientError

from src.services.deconz_service import get_from_deconz, put_to_deconz
from src.utils.response_util import build_response

lights = Blueprint("lights", __name__)

# Route to get added lights
# /api/v1/lights/list
@lights.route("/list", methods = ["GET"])
async def get_lights():
    try:
        endpoint = "/lights"
        response = await get_from_deconz(endpoint=endpoint)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to add new lights
# /api/v1/lights/add
@lights.route("/add", methods = ["PUT"])
async def add_lights():
    try:
        endpoint = "/config"
        payload = {"permitjoin": 60}
        response = await put_to_deconz(endpoint=endpoint, payload=payload)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)