from src import db

class Light(db.Model):
    __tablename__ = 'light'

    id = db.Column(db.Integer, primary_key=True)
    light_id = db.Column(db.Integer, nullable=False, unique=True)  # Deconz light ID
    house_id = db.Column(db.Integer, db.ForeignKey('house.id'), nullable=False)  # Foreign key to House

    def __repr__(self):
        return f'<Light ID: {self.light_id}>'
