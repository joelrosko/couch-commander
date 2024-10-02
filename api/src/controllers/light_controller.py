from flask import Response, Blueprint, jsonify, request

from src.services.deconz_service import get_from_deconz, put_to_deconz

light = Blueprint("light", __name__)

# Route to get added lights
# /api/v1/light/<int:lamp_id>
@light.route("/<int:lamp_id>", methods = ["GET"])
async def get_light_state(lamp_id):
    try:
        endpoint = f"/lights/{lamp_id}"
        data = await get_from_deconz(endpoint=endpoint)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to turn on and off lights
# /api/v1/light/<int:lamp_id>/on
@light.route('/<int:lamp_id>/on', methods=['POST'])
async def put_light_on_off(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return jsonify({"error": "no body data included"}), 400

        if "on" not in body:
            return jsonify({"error": "'on' state must be provided"}), 400

        on_state = body['on']

        if not isinstance(on_state, bool):
            return jsonify({"error": "'on' state must be a boolean"}), 400

        endpoint = f'/lights/{lamp_id}/state'

        payload = {"on": on_state}
        response = await put_to_deconz(endpoint, payload)

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to change light name
# /api/v1/light/<int:lamp_id>/name
@light.route('/<int:lamp_id>/name', methods=['POST'])
async def put_light_name(lamp_id):
    try:
        try:
            body = request.get_json()
        except Exception:
            return jsonify({"error": "no body data included"}), 400

        if "name" not in body:
            return jsonify({"error": "'name' state must be provided"}), 400

        light_name = body['name']

        if len(light_name) <= 0 or len(light_name) > 32:
            return jsonify({"error": "'name' must be between 1 - 32 chars"}), 400

        endpoint = f'/lights/{lamp_id}'

        payload = {"name": light_name}
        response = await put_to_deconz(endpoint, payload)

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500