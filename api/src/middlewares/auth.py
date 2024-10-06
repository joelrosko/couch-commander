from flask import request
import os

from src.utils.response_util import build_response

def verify_token():
    auth_header = request.headers.get("Authorization", None)
    
    if auth_header is None or not auth_header.startswith('Bearer '):
        return build_response(error="Bearer token not included", status=401)
    
    token = auth_header.split(" ")[1]

    if token != os.getenv("API_BEARER"):
        return build_response(error="Unauthorized access", status=403)