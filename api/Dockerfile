FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install uv && uv pip install --system -r requirements.txt

COPY src/ src/
COPY server.py .

RUN useradd --create-home --shell /bin/bash appuser && chown -R appuser:appuser /app
USER appuser
