from app.models import db, Watchlist, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_watchlists(watch_stocks):
    tech_companies = [watch_stocks[0], watch_stocks[1], watch_stocks[6], watch_stocks[7], watch_stocks[9], watch_stocks[10], watch_stocks[21], watch_stocks[26], watch_stocks[31]]
    finance_companies = [watch_stocks[2], watch_stocks[5], watch_stocks[14], watch_stocks[15], watch_stocks[29], watch_stocks[22]]
    entertainment_companies = [watch_stocks[8], watch_stocks[13], watch_stocks[16], watch_stocks[30]]
    retail_companies = [watch_stocks[3], watch_stocks[17], watch_stocks[27], watch_stocks[32], watch_stocks[33]]
    automotive_companies = [watch_stocks[11], watch_stocks[25]]
    ecommerce_companies = [watch_stocks[4], watch_stocks[12], watch_stocks[18], watch_stocks[28]]
    pharmaceutical_companies = [watch_stocks[37], watch_stocks[38], watch_stocks[39]]

    #user1
    watchlist1 = Watchlist(name = "Tech", user_id = 1, stocks = tech_companies)
    watchlist2 = Watchlist(name = "Finance", user_id = 1, stocks = finance_companies)
    watchlist3 = Watchlist(name = "Entertainment", user_id = 1, stocks = entertainment_companies)
    watchlist4 = Watchlist(name = "Retail", user_id = 1, stocks = retail_companies)
    watchlist5 = Watchlist(name = "Auto", user_id = 1, stocks = automotive_companies)
    watchlist6 = Watchlist(name = "Ecommerce", user_id = 1, stocks = ecommerce_companies)
    watchlist7 = Watchlist(name = "Pharm", user_id = 1, stocks = pharmaceutical_companies)

    #user2
    watchlist8 = Watchlist(name = "Tech", user_id = 2, stocks = tech_companies)
    watchlist9 = Watchlist(name = "Finance", user_id = 2, stocks = finance_companies)
    watchlist10 = Watchlist(name = "Entertainment", user_id = 2, stocks = entertainment_companies)

    #user3
    watchlist11 = Watchlist(name = "Auto", user_id = 3, stocks = automotive_companies)
    watchlist12 = Watchlist(name = "Ecommerce", user_id = 3, stocks = ecommerce_companies)
    watchlist13 = Watchlist(name = "Pharm", user_id = 3, stocks = pharmaceutical_companies)

    #user4
    watchlist14 = Watchlist(name = "Entertainment", user_id = 4, stocks = entertainment_companies)
    watchlist15 = Watchlist(name = "Retail", user_id = 4, stocks = retail_companies)
    watchlist16 = Watchlist(name = "Auto", user_id = 4, stocks = automotive_companies)

    #user5
    watchlist17 = Watchlist(name = "Tech", user_id = 5, stocks = tech_companies)
    watchlist18 = Watchlist(name = "Entertainment", user_id = 5, stocks = entertainment_companies)
    watchlist19 = Watchlist(name = "Auto", user_id = 5, stocks = automotive_companies)
    watchlist20 = Watchlist(name = "Pharm", user_id = 5, stocks = pharmaceutical_companies)


    all_watchlists = [watchlist1, watchlist2, watchlist3, watchlist4, watchlist5,
                      watchlist6, watchlist7, watchlist8, watchlist9, watchlist10,
                      watchlist11, watchlist12, watchlist13, watchlist14, watchlist15,
                      watchlist16, watchlist17, watchlist18, watchlist19, watchlist20, ]
    _ = [db.session.add(watchlist) for watchlist in all_watchlists]
    db.session.commit()


def undo_watchlists():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
