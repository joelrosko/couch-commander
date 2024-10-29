from flask import Blueprint, request
from datetime import datetime

from src.middlewares.auth import token_required_sync
from src import db
from src.models.error_logs import ErrorLog
from src.utils.response_util import build_response
from src.utils.logging_util import log_errors_to_db

error_logs = Blueprint("error_logs", __name__)

@error_logs.route("/", methods=["GET"])
@token_required_sync
def get_all():
    try:
        logs = ErrorLog.query.all()

        if len(logs) < 1:
            return build_response(message="No logs added to database", status=200)

        logs_data = [{log.id:{"timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M"), "endpoint": log.endpoint, "status": log.status_code, "error": log.error_message}} for log in logs]

        return build_response(data=logs_data, status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(message="Server error", status=500)

@error_logs.route("/", methods=["DELETE"])
@token_required_sync
def delete_all_logs():
    try:
        ErrorLog.query.delete()
        db.session.commit()

        return build_response(message="All logs are now deleted", status=200)
    except Exception as e:
        log_errors_to_db(
            endpoint=request.path,
            error_message=str(e),
            status_code=500
        )

        return build_response(message="Server error", status=500)