from app.models import db,  Transaction, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_transactions():

    trans1 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 120.22, shares_moved = 10, stock_id = 1, user_id = 1
    )
    trans2 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 273.22, shares_moved = 20, stock_id = 2, user_id = 1
    )
    trans3 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 822.48, shares_moved = 10, stock_id = 3, user_id = 1
    )
    trans4 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 193.12, shares_moved = 30, stock_id = 4, user_id = 1
    )
    trans5 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 132.99, shares_moved = 15, stock_id = 5, user_id = 1
    )
    trans6 = Transaction(
        date = datetime.datetime.now(), transaction_type = "BUY", share_price = 145.55, shares_moved = 50, stock_id = 6, user_id = 1
    )
    trans7 = Transaction(
        date = datetime.datetime.now(), transaction_type = "SELL", share_price = 160.55, shares_moved = 20, stock_id = 6, user_id = 1
    )
    trans8 = Transaction(
        date = datetime.datetime.now(), transaction_type = "SELL", share_price = 150.55, shares_moved = 15, stock_id = 5, user_id = 1
    )

    db.session.add(trans1)
    db.session.add(trans2)
    db.session.add(trans3)
    db.session.add(trans4)
    db.session.add(trans5)
    db.session.add(trans6)
    db.session.add(trans7)
    db.session.add(trans8)
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
