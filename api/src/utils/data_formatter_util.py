def format_lights_data(lights:dict):
    updated_response = {}
    for light_id, light_data in lights.items():
        included_ligt_data = {
            "name": light_data["name"],
            "status": light_data["state"]["on"],
            "manufacturer": "IKEA" if light_data["manufacturername"].startswith("IKEA") else light_data["manufacturername"],
            "bri": light_data["state"]["bri"],
            "temprature": light_data["state"]["ct"],
            "multicolor": True if light_data["state"]["colormode"] == "xy" else False,
        }
        if included_ligt_data["multicolor"]:
            included_ligt_data["color"]  =light_data["state"]["xy"]
            included_ligt_data["sat"]  =light_data["state"]["sat"]

        updated_response[light_id] = included_ligt_data

    return updated_response
