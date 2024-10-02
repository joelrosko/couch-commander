from flask import Response, Blueprint, jsonify, request

from src.services.deconz_service import get_from_deconz, put_to_deconz

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