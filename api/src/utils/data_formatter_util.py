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

def format_groups_data(groups:dict):
    updated_response = {}
    for group_id, group_data in groups.items():
        included_group_data = {
            "name": group_data['name'],
            "allOn": group_data["state"]['all_on'],
            "nDevices": len(group_data['lights'])
        }

        updated_response[group_id] = included_group_data

    return updated_response

def format_specific_group_data(group:dict):
    return {
        "id": group["id"],
        "name": group["name"],
        "allOn": group["state"]['all_on'],
        "anyOn": group["state"]['any_on'],
        "bri": group["action"]["bri"],
        "temprature": group["action"]["ct"],
        "color": group["action"]["xy"],
        "sat": group["action"]["sat"],
        "lights": group["lights"]
    }