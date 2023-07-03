from app.models import db, User, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_stocks():

    alphabet = Stock(
        base_price='122.22', company_name='Alphabet', ticker_symbol='GOOGL', available_shares=100000, total_shares = 1000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    tesla = Stock(
        base_price='272.22', company_name='Telsa', ticker_symbol='TSLA', available_shares=10000, total_shares = 100000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    berkshire = Stock(
        base_price='822.22', company_name='Berkshire', ticker_symbol='BKSH', available_shares=200000, total_shares = 2000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    apple = Stock(
        base_price='193.31', company_name='Apple', ticker_symbol='AAPL', available_shares=300000, total_shares = 3000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    amazon = Stock(
        base_price='132.43', company_name='Amazon', ticker_symbol='AMZN', available_shares=400000, total_shares = 4000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    jp_morgan = Stock(
        base_price='145.44', company_name='JPMorgan Chase', ticker_symbol='JPM', available_shares=500000, total_shares = 5000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())

    db.session.add(alphabet)
    db.session.add(tesla)
    db.session.add(berkshire)
    db.session.add(apple)
    db.session.add(amazon)
    db.session.add(jp_morgan)
    db.session.commit()

    all_stocks = [alphabet, tesla, berkshire]

    return all_stocks


def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
