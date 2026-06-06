.PHONY: setup setup-api setup-frontend run-api run-frontend lint lint-api \
	lint-frontend test test-api build build-frontend check format-api \
	pre-commit-install

setup: setup-api setup-frontend

setup-api:
	cd api && uv sync --dev

setup-frontend:
	cd frontend && npm ci

run-api:
	cd api && uv run python server.py

run-frontend:
	cd frontend && npm run dev

lint: lint-api lint-frontend

lint-api:
	cd api && uv run ruff check .

lint-frontend:
	cd frontend && npm run lint

test: test-api

test-api:
	cd api && uv run pytest

build: build-frontend

build-frontend:
	cd frontend && npm run build

check: lint-api test build

format-api:
	cd api && uv run ruff format .

pre-commit-install:
	cd api && uv run pre-commit install --install-hooks
