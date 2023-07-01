from .db import db, environment, SCHEMA
from .watchlists_stocks import watchlists_stocks

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    base_price = db.Column(db.Float, nullable = False)
    company_name = db.Column(db.String(50), nullable = False)
    ticker_symbol = db.Column(db.String(5), nullable = False)
    available_shares = db.Column(db.Integer, nullable = False)
    total_shares = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.Date, nullable = False)
    updated_at = db.Column(db.Date, nullable = False)

    transactions = db.relationship("Transaction",  back_populates="stock")

    watchlists = db.relationship("Watchlist", secondary=watchlists_stocks, back_populates="stocks")

    def to_dict(self):
        return {
            "id": self.id,
            "base_price": self.base_price,
            "company_name": self.company_name,
            "ticker_symbol": self.ticker_symbol,
            "available_shares": self.available_shares,
            "total_shares": self.total_shares,
            "created_at": self.created_at,
            "updated_at": self.updated_at

        }
