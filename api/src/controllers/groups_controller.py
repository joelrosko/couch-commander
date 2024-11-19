from flask import Blueprint, request
from aiohttp import ClientResponseError, ClientError

from src.middlewares.auth import token_required
from src.services.deconz_service import get_from_deconz, put_to_deconz, post_to_deconz, del_from_deconz
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db
from src.utils.data_formatter_util import format_groups_data, format_specific_group_data, format_lights_data

groups = Blueprint("groups", __name__)

# Route to get all groups
# /api/v1/groups/list
@groups.route("/list", methods = ["GET"])
@token_required
async def get_groups():
    try:
        endpoint = "/groups"
        response = await get_from_deconz(endpoint=endpoint)
        response = format_groups_data(response)

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

# Route to get specific group
# /api/v1/groups/<int:group_id>
@groups.route("/<int:group_id>", methods = ["GET"])
@token_required
async def get_group(group_id):
    try:
        endpoint = f"/groups/{group_id}"
        group_res = await get_from_deconz(endpoint=endpoint)
        group_data = format_specific_group_data(group_res)

        lights_res = await get_from_deconz(endpoint="/lights")
        group_lights = {key: value for key, value in lights_res.items() if key in group_data["lights"]}
        lights_data = format_lights_data(group_lights)

        group_data["multicolor"] = all(light["multicolor"] for light in lights_data.values())

        response = group_data

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

# Route to create group
# /api/v1/groups/create
@groups.route("/create", methods = ["POST"])
@token_required
async def create_group():
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

        if "name" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: name",
                status_code=400
            )

            return build_response(error="'name' state must be provided", status=400)

        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Name not within 1-32 chars",
                status_code=400
            )

            return build_response(error="'name' must be between 1 - 32 chars", status=400)

        endpoint = f'/groups'
        payload = {"name": group_name}

        response = await post_to_deconz(endpoint, payload)

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

# Route to toggle group state
# /api/v1/groups/<int:group_id>/on
@groups.route("/<int:group_id>/on", methods = ["PUT"])
@token_required
async def put_group_on_off(group_id):
    try:
        endpoint = f"/groups/{group_id}/action"
        payload = {"toggle": True}

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

# Route to update group name
# /api/v1/groups/<int:group_id>/name
@groups.route("/<int:group_id>/name", methods = ["PUT"])
@token_required
async def put_group_name(group_id):
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

        if "name" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: name",
                status_code=400
            )

            return build_response(error="'name' state must be provided", status=400)

        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Name not within 1-32 chars",
                status_code=400
            )

            return build_response(error="'name' must be between 1 - 32 chars", status=400)

        endpoint = f'/groups/{group_id}'
        payload = {"name": group_name}

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

# Route to add lights to group
# /api/v1/groups/<int:group_id>/add
@groups.route("/<int:group_id>/add", methods = ["PUT"])
@token_required
async def put_group_lights(group_id):
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

        if "lights" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: lights",
                status_code=400
            )

            return build_response(error="array of lights must be included", status=400)

        lights = body['lights']

        if not isinstance(lights, list) and not all(isinstance(light, str) for light in lights):
            log_errors_to_db(
                endpoint=request.path,
                error_message="Must be list of strings",
                status_code=400
            )

            return build_response(error="must be list of strings", status=400)

        endpoint = f'/groups/{group_id}'
        payload = {"lights": lights}

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

# Route to delete group
# /api/v1/groups/<int:group_id>/remove
@groups.route("/<int:group_id>/remove", methods = ["DELETE"])
@token_required
async def remove_group(group_id):
    try:
        endpoint = f'/groups/{group_id}'

        response = await del_from_deconz(endpoint)

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

# Route to update group brightness
# /api/v1/groups/<int:group_id>/bri
@groups.route("/<int:group_id>/bri", methods = ["PUT"])
@token_required
async def put_group_bri(group_id):
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

        endpoint = f"/groups/{group_id}/action"
        payload = {"bri": bri_state}

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
# /api/v1/groups/<int:group_id>/hue
@groups.route('/<int:group_id>/hue', methods=['PUT'])
@token_required
async def put_hue_light(group_id):
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

        endpoint = f"/groups/{group_id}/action"
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

# Route to get group lights
# /api/v1/groups/lights
@groups.route("/lights", methods = ["PUT"])
@token_required
async def get_group_lights():
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

        if "lights" not in body:
            log_errors_to_db(
                endpoint=request.path,
                error_message="Missing key: lights",
                status_code=400
            )

            return build_response(error="array of lights must be included", status=400)

        lights = body['lights']

        endpoint = "/lights"
        init_response = await get_from_deconz(endpoint=endpoint)
        init_response = format_lights_data(init_response)

        response = {key: value for key, value in init_response.items() if key in lights}

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
