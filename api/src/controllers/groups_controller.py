from flask import Response, Blueprint, jsonify, request

from src.services.deconz_service import get_from_deconz, put_to_deconz, post_to_deconz

groups = Blueprint("groups", __name__)

# Route to get all groups
# /api/v1/groups/list
@groups.route("/list", methods = ["GET"])
async def get_groups():
    try:
        endpoint = "/groups"
        data = await get_from_deconz(endpoint=endpoint)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get specific group
# /api/v1/groups/<int:group_id>
@groups.route("/<int:group_id>", methods = ["GET"])
async def get_group(group_id):
    try:
        endpoint = f"/groups/{group_id}"
        data = await get_from_deconz(endpoint=endpoint)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to create group
# /api/v1/groups/create
@groups.route("/create", methods = ["POST"])
async def create_group():
    try:
        try:
            body = request.get_json()
        except Exception:
            return jsonify({"error": "no body data included"}), 400
        
        if "name" not in body:
            return jsonify({"error": "'name' state must be provided"}), 400
        
        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            return jsonify({"error": "'name' must be between 1 - 32 chars"}), 400
        
        endpoint = f'/groups'
        payload = {"name": group_name}

        response = await post_to_deconz(endpoint, payload)

        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to toggle group state
# /api/v1/groups/<int:group_id>/on
@groups.route("/<int:group_id>/on", methods = ["PUT"])
async def put_group_on_off(group_id):
    try:
        endpoint = f"/groups/{group_id}/action"
        payload = {"toggle": True}

        data = await put_to_deconz(endpoint=endpoint, payload=payload)

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to update group name
# /api/v1/groups/<int:group_id>/name
@groups.route("/<int:group_id>/name", methods = ["PUT"])
async def put_group_name(group_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return jsonify({"error": "no body data included"}), 400
        
        if "name" not in body:
            return jsonify({"error": "'name' state must be provided"}), 400
        
        group_name = body['name']

        if len(group_name) <= 0 or len(group_name) > 32:
            return jsonify({"error": "'name' must be between 1 - 32 chars"}), 400
        
        endpoint = f'/groups/{group_id}'
        payload = {"name": group_name}

        response = await put_to_deconz(endpoint, payload)

        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to add lights to group
# /api/v1/groups/<int:group_id>/add
@groups.route("/<int:group_id>/add", methods = ["PUT"])
async def put_group_lights(group_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return jsonify({"error": "no body data included"}), 400
        
        if "lights" not in body:
            return jsonify({"error": "array of lights must be included"}), 400
        
        lights = body['lights']

        if not isinstance(lights, list) and not all(isinstance(light, str) for light in lights):
            return jsonify({"error": "must be list of strings"}), 400
        
        endpoint = f'/groups/{group_id}'
        payload = {"lights": lights}

        response = await put_to_deconz(endpoint, payload)

        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500