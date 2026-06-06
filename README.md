# Couch Commander

Web dashboard for controlling smart home devices via deCONZ. Flask API backend with a React + MUI frontend.

## Stack

- **Frontend:** React, Vite, MUI
- **Backend:** Flask (Python)
- **Database:** CouchDB
- **Gateway:** deCONZ (ZigBee)

## Development

Prerequisites:

- Python 3.12
- [uv](https://docs.astral.sh/uv/)
- Node.js and npm

Install dependencies and Git hooks:

```bash
make setup
make pre-commit-install
```

Run the services in separate terminals:

```bash
make run-api
make run-frontend
```

Run validation:

```bash
make check
```

Individual validation commands are available as `make lint`, `make test`, and
`make build`. `make lint` includes the frontend's existing ESLint backlog;
`make check` keeps API lint, tests, and the frontend build blocking while that
backlog is addressed.
