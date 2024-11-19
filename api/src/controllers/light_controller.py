from flask import Blueprint, request
from aiohttp import ClientResponseError, ClientError

from src.middlewares.auth import token_required
from src.services.deconz_service import get_from_deconz, put_to_deconz, del_from_deconz
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db
from src.utils.data_formatter_util import format_light_data

light = Blueprint("light", __name__)

# Route to get added lights
# /api/v1/light/<int:lamp_id>
@light.route("/<int:lamp_id>", methods = ["GET"])
@token_required
async def get_light_state(lamp_id):
    try:
        endpoint = f"/lights/{lamp_id}"
        response = await get_from_deconz(endpoint=endpoint)
        response = format_light_data(response)

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

# Route to turn on and off lights
# /api/v1/light/<int:lamp_id>/on
@light.route('/<int:lamp_id>/on', methods=['PUT'])
@token_required
async def put_light_on_off(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No body data included",
                status_code=400
            )

            return build_response(error="no body data included", status=400)

        if "on" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: on",
                status_code=400
            )

            return build_response(error="'on' state must be provided", status=400)

        on_state = body['on']

        if not isinstance(on_state, bool):
            log_errors_to_db(
                endpoint=request.path,
                error_message="Value must be boolean",
                status_code=400
            )

            return build_response(error="'on' state must be a boolean", status=400)

        endpoint = f'/lights/{lamp_id}/state'

        payload = {"on": on_state}
        response = await put_to_deconz(endpoint, payload)

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

# Route to change light name
# /api/v1/light/<int:lamp_id>/name
@light.route('/<int:lamp_id>/name', methods=['PUT'])
@token_required
async def put_light_name(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Body data not included",
                status_code=400
            )

            return build_response(error="no body data included", status=400)

        if "name" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: name",
                status_code=400
            )

            return build_response(error="'name' state must be included", status=400)

        light_name = body['name']

        if len(light_name) <= 0 or len(light_name) > 32:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Name not within 1-32 chars",
                status_code=400
            )

            return build_response(error="'name' must be between 1 - 32 chars", status=400)

        endpoint = f'/lights/{lamp_id}'

        payload = {"name": light_name}
        response = await put_to_deconz(endpoint, payload)

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

# Route to delete light
# /api/v1/light/<int:lamp_id>/remove
@light.route('/<int:lamp_id>/remove', methods=['DELETE'])
@token_required
async def remove_light(lamp_id):
    try:
        endpoint = f'/lights/{lamp_id}'

        payload = {"reset": True}
        response = await del_from_deconz(endpoint, payload)

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

# Route to set bri of light
# /api/v1/light/<int:lamp_id>/bri
@light.route('/<int:lamp_id>/bri', methods=['PUT'])
@token_required
async def put_light_bri(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No body data included",
                status_code=400
            )

            return build_response(error="no body data included", status=400)

        if "bri" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: bri",
                status_code=400
            )

            return build_response(error="'bri' state must be provided", status=400)

        bri_state = body['bri']

        if not isinstance(bri_state, int):
            log_errors_to_db(
                endpoint=request.path,
                error_message="Bri must be an int",
                status_code=400
            )

            return build_response(error="'bri' must be a integer", status=400)

        if bri_state <= 0 or bri_state > 255:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Bri not within 1-255",
                status_code=400
            )

            return build_response(error="'bri' must be a integer between 1 - 255", status=400)

        endpoint = f'/lights/{lamp_id}/state'

        payload = {"bri": bri_state}
        response = await put_to_deconz(endpoint, payload)

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

# Route to set color of light
# /api/v1/light/<int:lamp_id>/color
@light.route('/<int:lamp_id>/color', methods=['PUT'])
@token_required
async def put_light_color(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No body data included",
                status_code=400
            )

            return build_response(error="no body data included", status=400)

        if "xy" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: xy",
                status_code=400
            )

            return build_response(error="'xy' values must be provided", status=400)

        xy_state = body['xy']

        if not isinstance(xy_state, list):
            log_errors_to_db(
                endpoint=request.path,
                error_message="xy must be a list",
                status_code=400
            )

            return build_response(error="'xy' must be a list", status=400)

        if min(xy_state) < 0 or max(xy_state) > 1:
            log_errors_to_db(
                endpoint=request.path,
                error_message="xy not within 0-1",
                status_code=400
            )

            return build_response(error="'xy' values must be a integer between 0 - 1", status=400)

        endpoint = f'/lights/{lamp_id}/state'

        payload = {
            "sat": 130,
            "xy": xy_state
            }
        response = await put_to_deconz(endpoint, payload)

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

# Route to indicate light
# /api/v1/light/<int:lamp_id>/indicate
@light.route('/<int:lamp_id>/indicate', methods=['PUT'])
@token_required
async def put_indicate_light(lamp_id):
    try:
        endpoint = f"/lights/{lamp_id}/state"
        payload = {"alert": "lselect"}
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

# Route to set hue color
# /api/v1/light/<int:lamp_id>/hue
@light.route('/<int:lamp_id>/hue', methods=['PUT'])
@token_required
async def put_hue_light(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            log_errors_to_db(
                endpoint=request.path,
                error_message="No body data included",
                status_code=400
            )

            return build_response(error="no body data included", status=400)

        if "hue" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: hue",
                status_code=400
            )

            return build_response(error="'hue' values must be provided", status=400)

        hue = body["hue"]

        if isinstance(hue, float):
            log_errors_to_db(
                endpoint=request.path,
                error_message="hue value not an int",
                status_code=400
            )

            return build_response(error="hue value not an int", status=400)

        hue = (hue / 360) * 65535

        if hue < 0 or hue > 65535:
            log_errors_to_db(
                endpoint=request.path,
                error_message="hue value either too small or too great",
                status_code=400
            )

            return build_response(error="hue value either too small or too great", status=400)

        endpoint = f"/lights/{lamp_id}/state"
        payload = {"sat": 130,
                   "hue": int(hue)}
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
