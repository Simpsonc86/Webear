from app.models import db,  Transaction, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_transactions():

    #initial purchases (from 0 shares)
    trans1 = Transaction( # -1222.20 / Alphabet: 0->10
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 122.22, shares_moved = 10, stock_id = 1, user_id = 1)

    trans2 = Transaction( # -3866.20 / Apple: 0->20
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 193.31, shares_moved = 20, stock_id = 4, user_id = 1)

    trans3 = Transaction( # -2648.6 / Amazon: 0->20
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 132.43, shares_moved = 20, stock_id = 5, user_id = 1)

    trans4 = Transaction( # -1222.20 / Meta: 0->10
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 122.22, shares_moved = 10, stock_id = 10, user_id = 1)

    trans5 = Transaction( # -3366.80 / Microsoft: 0->10
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 336.68, shares_moved = 10, stock_id = 11, user_id = 1)

    trans6 = Transaction( # -2841.05 / Netflix: 0->5
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 436.81, shares_moved = 5, stock_id = 14, user_id = 1)

    trans7 = Transaction( # -1360.80 / Paypal: 0->20
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 68.04, shares_moved = 20, stock_id = 16, user_id = 1)

    trans8 = Transaction( # -901.50/ Disney: 0->10
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 90.15, shares_moved = 10, stock_id = 17, user_id = 1)

    trans9 = Transaction( # -3366.80 / Microsoft: 10->20
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 336.68, shares_moved = 10, stock_id = 11, user_id = 1)

    trans10 = Transaction( # -1957.5 / Astrazeneza: 0->30
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 65.25, shares_moved = 30, stock_id = 38, user_id = 1)

    trans11 = Transaction( # -3665.00 / Pfizer: 0->100
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 36.65, shares_moved = 100, stock_id = 39, user_id = 1)

    trans12 = Transaction( # -8167.50 / Johnson&Johnson: 0->50
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 163.35, shares_moved = 50, stock_id = 40, user_id = 1)

    #selling all shares of a company
    trans13 = Transaction( # +1222.20 / Meta: 10->0
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 122.22, shares_moved = 10, stock_id = 10, user_id = 1)

    trans14 = Transaction( # +2841.05 / Netflix: 5->0
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 436.81, shares_moved = 5, stock_id = 14, user_id = 1)

    trans15 = Transaction( # +1360.80 / Paypal: 20->0
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 68.04, shares_moved = 20, stock_id = 16, user_id = 1)

    trans16 = Transaction( # +3366.80 / Microsoft: 20->10
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 336.68, shares_moved = 10, stock_id = 11, user_id = 1)

    #selling some, but not all shares of a company
    trans17 = Transaction( # +611.10 / Alphabet: 10->5
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 122.22, shares_moved = 5, stock_id = 1, user_id = 1)

    trans18 = Transaction( # +1933.1 / Apple: 20->10
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 193.31, shares_moved = 10, stock_id = 4, user_id = 1)

    trans19 = Transaction( # +1324.30 / Amazon: 20->10
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 132.43, shares_moved = 10, stock_id = 5, user_id = 1)

    #buying more shares of a company the user already has shares in
    trans20 = Transaction( # -4567.5 / Astrazeneza: 30->100
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 65.25, shares_moved = 70, stock_id = 38, user_id = 1)

    trans21 = Transaction( # -1832.5 / Pfizer: 100->200
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 36.65, shares_moved = 100, stock_id = 39, user_id = 1)

    trans22 = Transaction( # -8167.50 / Johnson&Johnson: 50->100
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 163.35, shares_moved = 50, stock_id = 40, user_id = 1)

    #selling some shares of a company after purchasing additional
    trans23 = Transaction( # +1245.00 / Astrazeneza: 100->80
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 65.25, shares_moved = 20, stock_id = 38, user_id = 1)

    trans24 = Transaction( # +1099.5 / Pfizer: 200->170
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 36.65, shares_moved = 30, stock_id = 39, user_id = 1)

    trans25 = Transaction( # +4900.5 / Johnson&Johnson: 100->70
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 163.35, shares_moved = 30, stock_id = 40, user_id = 1)

    #selling the rest of the shares of a company after previously selling some
    trans26= Transaction( # +611.10 / Alphabet: 5->0
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 122.22, shares_moved = 5, stock_id = 1, user_id = 1)

    trans27 = Transaction( # +1933.1 / Apple: 10->0
        date = datetime.datetime.now(), transaction_type = "SELL",
        share_price = 193.31, shares_moved = 10, stock_id = 4, user_id = 1)

    #buying shares in a company after previously selling all shares
    trans28 = Transaction( # -1222.20 / Alphabet: 0->10
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 122.22, shares_moved = 10, stock_id = 1, user_id = 1)

    trans29 = Transaction( # -3866.20 / Apple: 0->20
        date = datetime.datetime.now(), transaction_type = "BUY",
        share_price = 193.31, shares_moved = 20, stock_id = 4, user_id = 1)

    all_transactions = [
                        trans1, trans2, trans3, trans4, trans5,
                        trans6, trans7, trans8, trans9, trans10,
                        trans11, trans12, trans13, trans14, trans15,
                        trans16, trans17, trans18, trans19, trans20,
                        trans21, trans22, trans23, trans24, trans25,
                        trans26, trans27, trans28, trans29
                        ]
    _ = [db.session.add(transaction) for transaction in all_transactions]
    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
