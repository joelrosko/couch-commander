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
# /api/v1/groups/<int:lamp_id>
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