from .db import db, SCHEMA, environment, add_prefix_for_prod
from .watchlists_stocks import watchlists_stocks

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    #relationship attributes
    user = db.relationship("User",  back_populates="watchlists")
    stocks = db.relationship("Stock", secondary=watchlists_stocks, back_populates="watchlists")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "user": self.user.to_dict(),
            "stocks": [stock.to_dict() for stock in self.stocks]
        }
