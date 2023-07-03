from app.models import db, Watchlist, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_watchlists(watch_stocks):

    print("watch stocks in watchlist seeder", watch_stocks)

    watchlist1 = Watchlist(
        name = "energy", user_id = 1, stocks = watch_stocks
    )




    subset_stocks = [watch_stocks[0], watch_stocks[1]]

    watchlist2 = Watchlist(
        name = "tech", user_id = 2, stocks = subset_stocks
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.commit()


def undo_watchlists():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
