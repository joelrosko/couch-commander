from src import db

class House(db.Model):
    __tablename__ = "house"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    lights = db.relationship('Light', backref='house', lazy=True)

    def __repr__(self):
        return f'<House {self.name}>'