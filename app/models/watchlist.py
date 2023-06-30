from .db import db
from .watchlists_stocks import watchlists_stocks

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    #relationship attributes
    user = db.relationship("User",  back_populates="watchlists")
    stocks = db.relationship("Stock", secondary=watchlists_stocks, back_populates="watchlists")
