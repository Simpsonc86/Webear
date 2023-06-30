
from sqlalchemy.schema import Table
from .db import db

watchlists_stocks = Table(
    "watchlists_stocks",
    db.Model.metadata,
    db.Column("stock_id", db.ForeignKey("stocks.id"), primary_key=True),
    db.Column("watchlist_id", db.ForeignKey("watchlists.id"), primary_key=True))
