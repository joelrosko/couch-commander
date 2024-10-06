from flask import Blueprint, request
from aiohttp import ClientResponseError, ClientError

from src.services.deconz_service import get_from_deconz, put_to_deconz, post_to_deconz, del_from_deconz
from src.utils.response_util import build_response

groups = Blueprint("groups", __name__)

# Route to get all groups
# /api/v1/groups/list
@groups.route("/list", methods = ["GET"])
async def get_groups():
    try:
        endpoint = "/groups"
        response = await get_from_deconz(endpoint=endpoint)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to get specific group
# /api/v1/groups/<int:group_id>
@groups.route("/<int:group_id>", methods = ["GET"])
async def get_group(group_id):
    try:
        endpoint = f"/groups/{group_id}"
        response = await get_from_deconz(endpoint=endpoint)
        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to create group
# /api/v1/groups/create
@groups.route("/create", methods = ["POST"])
async def create_group():
    try:
        try:
            body = request.get_json()
        except Exception:
            return build_response(error="no body data included", status=400)
        
        if "name" not in body:
            return build_response(error="'name' state must be provided", status=400)
        
        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            return build_response(error="'name' must be between 1 - 32 chars", status=400)
        
        endpoint = f'/groups'
        payload = {"name": group_name}

        response = await post_to_deconz(endpoint, payload)

        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to toggle group state
# /api/v1/groups/<int:group_id>/on
@groups.route("/<int:group_id>/on", methods = ["PUT"])
async def put_group_on_off(group_id):
    try:
        endpoint = f"/groups/{group_id}/action"
        payload = {"toggle": True}

        response = await put_to_deconz(endpoint=endpoint, payload=payload)

        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to update group name
# /api/v1/groups/<int:group_id>/name
@groups.route("/<int:group_id>/name", methods = ["PUT"])
async def put_group_name(group_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return build_response(error="no body data included", status=400)
        
        if "name" not in body:
            return build_response(error="'name' state must be provided", status=400)
        
        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            return build_response(error="'name' must be between 1 - 32 chars", status=400)
        
        endpoint = f'/groups/{group_id}'
        payload = {"name": group_name}

        response = await put_to_deconz(endpoint, payload)

        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to add lights to group
# /api/v1/groups/<int:group_id>/add
@groups.route("/<int:group_id>/add", methods = ["PUT"])
async def put_group_lights(group_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return build_response(error="no body data included", status=400)
        
        if "lights" not in body:
            return build_response(error="array of lights must be included", status=400)
        
        lights = body['lights']

        if not isinstance(lights, list) and not all(isinstance(light, str) for light in lights):
            return build_response(error="must be list of strings", status=400)
        
        endpoint = f'/groups/{group_id}'
        payload = {"lights": lights}

        response = await put_to_deconz(endpoint, payload)

        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)

# Route to delete group
# /api/v1/groups/<int:group_id>/remove
@groups.route("/<int:group_id>/remove", methods = ["DELETE"])
async def remove_group(group_id):
    try:
        endpoint = f'/groups/{group_id}'

        response = await del_from_deconz(endpoint)

        return build_response(data=response, status=200)
    except ClientResponseError as e:
        return build_response(error=f"Failed at: {e.message}", status=e.status)
    except ClientError as e:
        return build_response(error=f"Client error: {str(e)}", status=500)
    except Exception as e:
        return build_response(error="Server error", status=500)