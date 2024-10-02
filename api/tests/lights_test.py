import aiohttp

async def test_on_off():
    url = "http://127.0.0.1:3000/api/v1/light/1/on"
    payload = {"on": True}

    async with aiohttp.ClientSession() as session:
        async with session.post(url=url, json=payload) as response:
            response.raise_for_status()  # Raises an error for non-2xx responses
            print(await response.json())

async def test_name():
    url = "http://127.0.0.1:3000/api/v1/light/2/name"
    payload = {"name": "Ska raderas"}

    async with aiohttp.ClientSession() as session:
        async with session.post(url=url, json=payload) as response:
            response.raise_for_status()  # Raises an error for non-2xx responses
            print(await response.json())