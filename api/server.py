# Server entry point

from src import init_server

server = init_server()

if __name__ == "__main__":
    with server.app_context():
        from src import db
        db.create_all()

        from src.utils.db_util import seed_house_table
        seed_house_table()

    port = server.config.get("PORT")
    server.run(port=port)