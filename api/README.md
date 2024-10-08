# DB #
0. `export FLASK_APP=server.py   `
1. `flask db init` (only execute forst time)
2. `flask db migrate -m "<Migration message>"`
3. `flask db upgrade`