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

    db.session.add(trans2)
    db.session.add(trans1)
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
