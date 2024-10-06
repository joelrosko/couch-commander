import aiohttp
from flask import current_app
import asyncio


# GET request to deCONZ API
async def get_from_deconz(endpoint: str):
    """
    Fetch data from the deCONZ API asynchronously.
    :param endpoint: The endpoint to hit (e.g., '/devices', '/lights').
    :return: Parsed JSON response.
    """
    deconz_api_url = current_app.config['DECONZ_API_URL']
    deconz_api_key = current_app.config['DECONZ_API_KEY']
    time_out = aiohttp.ClientTimeout(total=current_app.config['TIME_OUT'])
    url = f'{deconz_api_url}{deconz_api_key}{endpoint}'
    try:
        async with aiohttp.ClientSession(timeout=time_out) as session:
            async with session.get(url=url) as response:
                response.raise_for_status()  # Raises an error for non-2xx responses
                return await response.json()
    except asyncio.TimeoutError:
        raise aiohttp.ClientError("Request to Deconz timed out")
    except aiohttp.ClientError as e:
        raise aiohttp.ClientError(f"Failed to connect to Deconz: {str(e)}")
        
# PUT request to deCONZ API
async def put_to_deconz(endpoint: str, payload: dict):
    """
    Sends a PUT request to the deCONZ API with the provided payload.
    :param endpoint: API endpoint to send the request to (e.g., '/lights/<id>/state').
    :param payload: JSON payload to send in the request body.
    :return: Response data from the API.
    """
    deconz_api_url = current_app.config['DECONZ_API_URL']
    deconz_api_key = current_app.config['DECONZ_API_KEY']
    time_out = aiohttp.ClientTimeout(total=current_app.config['TIME_OUT'])
    url = f"{deconz_api_url}{deconz_api_key}{endpoint}"
    try:
        async with aiohttp.ClientSession(timeout=time_out) as session:
            async with session.put(url=url, json=payload) as response:
                response.raise_for_status()  # Raises an error for non-2xx responses
                return await response.json()
    except asyncio.TimeoutError:
        raise aiohttp.ClientError("Request to Deconz timed out")
    except aiohttp.ClientError as e:
        raise aiohttp.ClientError(f"Failed to connect to Deconz: {str(e)}")
        
# POST request to deCONZ API
async def post_to_deconz(endpoint: str, payload: dict):
    """
    Sends a POST request to the deCONZ API with the provided payload.
    :param endpoint: API endpoint to send the request to (e.g., '/lights/<id>/state').
    :param payload: JSON payload to send in the request body.
    :return: Response data from the API.
    """
    deconz_api_url = current_app.config['DECONZ_API_URL']
    deconz_api_key = current_app.config['DECONZ_API_KEY']
    time_out = aiohttp.ClientTimeout(total=current_app.config['TIME_OUT'])
    url = f"{deconz_api_url}{deconz_api_key}{endpoint}"
    try:
        async with aiohttp.ClientSession(timeout=time_out) as session:
            async with session.post(url=url, json=payload) as response:
                response.raise_for_status()  # Raises an error for non-2xx responses
                return await response.json()
    except asyncio.TimeoutError:
        raise aiohttp.ClientError("Request to Deconz timed out")
    except aiohttp.ClientError as e:
        raise aiohttp.ClientError(f"Failed to connect to Deconz: {str(e)}")

# DELETE request to deCONZ API
async def del_from_deconz(endpoint: str, payload: dict={}):
    """
    Sends a POST request to the deCONZ API with the provided payload.
    :param endpoint: API endpoint to send the request to (e.g., '/lights/<id>/state').
    :param payload: JSON payload to send in the request body.
    :return: Response data from the API.
    """
    deconz_api_url = current_app.config['DECONZ_API_URL']
    deconz_api_key = current_app.config['DECONZ_API_KEY']
    time_out = aiohttp.ClientTimeout(total=current_app.config['TIME_OUT'])
    url = f"{deconz_api_url}{deconz_api_key}{endpoint}"
    try:
        if not payload:
            async with aiohttp.ClientSession(timeout=time_out) as session:
                async with session.delete(url=url) as response:
                    response.raise_for_status()  # Raises an error for non-2xx responses
                    return await response.json()
        else:
            async with aiohttp.ClientSession(timeout=time_out) as session:
                async with session.delete(url=url, json=payload) as response:
                    response.raise_for_status()  # Raises an error for non-2xx responses
                    return await response.json()
    except asyncio.TimeoutError:
        raise aiohttp.ClientError("Request to Deconz timed out")
    except aiohttp.ClientError as e:
        raise aiohttp.ClientError(f"Failed to connect to Deconz: {str(e)}")