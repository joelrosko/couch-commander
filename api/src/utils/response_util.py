from flask import Response, jsonify

def build_response(data=None, message=None, status=200, error=None, headers=None):
    """
    Utility function to generate a standardized JSON response.

    :param data: The data to return in the response body (default is None).
    :param message: A custom message (default is None).
    :param status: HTTP status code (default is 200).
    :param error: Error message to return if there is an error (default is None).
    :param headers: Any additional headers to include (default is None).
    :return: Flask Response object with JSON formatted body.
    """
    response_body = {
        "status": status,
        "message": message if message else ("success" if status < 400 else "error"),
        "data": data if not error else None,
        "error": error
    }

    response = jsonify(response_body)

    response.status_code = status

    if headers:
        for key, value in headers.items():
            response.headers[key] = value

    return response