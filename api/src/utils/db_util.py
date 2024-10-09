from src import db

from src.models.house import House

def seed_house_table():
    if House.query.count() == 0:
        default_house = House(name="Enter name")
        db.session.add(default_house)
        db.session.commit()
