from flask import Response, Blueprint, jsonify

from src.services.deconz_service import get_from_deconz

lights = Blueprint("lights", __name__)

# Route to get added lights
# /api/v1/lights/list
@lights.route("/list", methods = ["GET"])
async def get_lights():
    try:
        endpoint = "/lights"
        data = await get_from_deconz(endpoint=endpoint)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500