from sqlalchemy.sql import func

from src import db

class ErrorLog(db.Model):
    __tablename__ = "error_logs"

    id = db.Column(db.Integer, primary_key=True)
    endpoint = db.Column(db.String(256), nullable=False)
    error_message = db.Column(db.String(1024), nullable=False)
    status_code = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=func.now(), nullable=False)

    def __init__(self, endpoint, error_message, status_code):
        self.endpoint = endpoint
        self.error_message = error_message
        self.status_code = status_code

    def __repr__(self):
        return "Logs table"

    @staticmethod
    def maintain_limit(session, limit=50):
        count = session.query(ErrorLog).count()
        if count >= limit:
            oldest_logs = (session.query(ErrorLog)
                           .order_by(ErrorLog.timestamp)
                           .limit(count - limit + 1)
                           .all())
            for log in oldest_logs:
                session.delete(log)
            session.commit()