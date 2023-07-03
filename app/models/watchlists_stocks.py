
from sqlalchemy.schema import Table
from .db import db, add_prefix_for_prod, environment, SCHEMA



watchlists_stocks = Table(
    "watchlists_stocks",
    db.Model.metadata,
    db.Column("stock_id", db.ForeignKey(add_prefix_for_prod("stocks.id")), primary_key=True),
    db.Column("watchlist_id", db.ForeignKey(add_prefix_for_prod("watchlists.id")), primary_key=True))


if environment == "production":
       watchlists_stocks.schema = SCHEMA
