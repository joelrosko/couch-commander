# Server entry point

from src import init_server

server = init_server()

if __name__ == "__main__":
    port = server.config.get("PORT")
    server.run(port=port)