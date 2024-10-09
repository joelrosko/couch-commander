from flask import current_app, request

from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(error),
            status_code=404
        )

        return build_response(error="Resource not found", status=404)

    @app.errorhandler(Exception)
    def handle_exception(error):
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(error),
            status_code=500
        )

        return build_response(error="An unexpected error occurred", status=500)