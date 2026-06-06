from src.utils.data_formatter_util import format_light_data


def test_format_light_data_normalizes_ikea_manufacturer():
    light = {
        "name": "Desk lamp",
        "manufacturername": "IKEA of Sweden",
        "state": {
            "on": True,
            "bri": 200,
            "ct": 300,
        },
    }

    assert format_light_data(light) == {
        "name": "Desk lamp",
        "status": True,
        "manufacturer": "IKEA",
        "bri": 200,
        "temprature": 300,
        "multicolor": False,
    }


def test_format_light_data_includes_color_information():
    light = {
        "name": "Color lamp",
        "manufacturername": "Example",
        "state": {
            "on": False,
            "bri": 100,
            "ct": 250,
            "hue": 32768,
            "sat": 150,
        },
    }

    result = format_light_data(light)

    assert result["multicolor"] is True
    assert result["color"] == 180
    assert result["sat"] == 150
