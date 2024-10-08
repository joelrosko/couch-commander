from src import db

from src.models.house import House

def seed_house_table():
    # Check if the table is empty
    if House.query.count() == 0:
        # Create a new house entry
        default_house = House(name="Enter name")
        db.session.add(default_house)
        db.session.commit()
        print("Seeded database with default house.")
    else:
        print("House table already has data.")
