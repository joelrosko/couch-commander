from flask import request
import os
from functools import wraps
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

async def verify_token():
    auth_header = request.headers.get("Authorization", None)
    if auth_header is None or not auth_header.startswith('Bearer '):
        return build_response(error="Bearer token not included", status=401)

    token = auth_header.split(" ")[1]
    if token != os.getenv("API_BEARER"):
        log_errors_to_db(
            endpoint=request.path,
            error_message="Unauthorized access",
            status_code=403
        )
        return build_response(error="Unauthorized access", status=403)

    return None  # Indicates success

def token_required(f):
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        verification_result = await verify_token()  # Await the async function
        if verification_result:
            return verification_result
        return await f(*args, **kwargs)  # Proceed to the actual route function
    return decorated_function

def verify_token_sync():
    auth_header = request.headers.get("Authorization", None)
    if auth_header is None or not auth_header.startswith('Bearer '):
        return build_response(error="Bearer token not included", status=401)

    token = auth_header.split(" ")[1]
    if token != os.getenv("API_BEARER"):
        log_errors_to_db(
            endpoint=request.path,
            error_message="Unauthorized access",
            status_code=403
        )
        return build_response(error="Unauthorized access", status=403)

    return None  # Indicates success

def token_required_sync(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verification_result = verify_token_sync()  # Await the async function
        if verification_result:
            return verification_result
        return f(*args, **kwargs)  # Proceed to the actual route function
    return decorated_function
