from flask import current_app
from src.utils.response_util import build_response

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        return build_response(error="Resource not found", status=404)

    @app.errorhandler(Exception)
    def handle_exception(error):
        return build_response(error="An unexpected error occurred", status=500)