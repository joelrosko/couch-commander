# Couch Commander Development

## Project Layout

- `api/`: Flask API managed with `uv`
- `frontend/`: React and Vite frontend managed with npm
- `deconz/`: deCONZ setup notes

## Commands

Run project commands from the repository root.

- `make setup`: install API and frontend dependencies
- `make run-api`: run the Flask API
- `make run-frontend`: run the Vite development server
- `make lint`: lint the API and frontend
- `make test`: run automated tests
- `make build`: build the frontend
- `make check`: run blocking API lint, tests, and the frontend build
- `make format-api`: format Python files
- `make pre-commit-install`: install the Git pre-commit hook

The files in `api/tests/test.py` and `api/tests/lights_test.py` are manual
requests against a running API. Automated pytest files must be named
`test_*.py`.

## Implementation

- Make the smallest reasonable change that solves the task.
- Keep Flask routes thin and put reusable behavior in services or utilities.
- Keep deCONZ access behind `api/src/services/deconz_service.py`.
- Do not commit `.env` files, API keys, database credentials, or deCONZ keys.
- Add or update tests for backend behavior changes.
- Run `make check` before opening a pull request.
- Run `make lint` when working on frontend lint debt; existing frontend files
  may still report legacy issues.
