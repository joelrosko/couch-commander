from src import db
from src.models.error_logs import ErrorLog

def log_errors_to_db(endpoint:str, error_message:str, status_code:int):
    try:
        ErrorLog.maintain_limit(db.session)

        error_log = ErrorLog(
            endpoint=endpoint,
            error_message=error_message,
            status_code=status_code
        )
        db.session.add(error_log)
        db.session.commit()
    except Exception:
        pass