from flask import request, Response, json, Blueprint

lights = Blueprint("lights", __name__)

# Route to get added lights
@lights.route("/list", methods = ["GET"])
def get_lights():
    try:
        try:
            data = request.json
            print(data)
        except Exception as e:
            print(e)
        return Response(
            response=json.dumps({
                                "status": "good",
                                "message": "Successful request",
                            }),
            status=200,
            mimetype="application/json"
        )
    except Exception as e:
        return Response(
            response=json.dumps({
                                "status": "failed",
                                "message": "Error occured",
                                "error": str(e)
                            }),
            status=500,
            mimetype="application/json"
        )