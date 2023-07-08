from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .transactions import Transaction
import json


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    balance = db.Column(db.Float)

    transactions = db.relationship("Transaction", back_populates="user")
    watchlists = db.relationship("Watchlist", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)



    def calculate_portfolio(self):
        portfolio = {}

        for t in self.transactions:
            if not t.stock.ticker_symbol in portfolio.keys():
                portfolio[t.stock.ticker_symbol] = { "stock": t.stock.to_dict(), "shares_owned": t.shares_moved }


            else:
                if t.transaction_type == "SELL":
                    total_shares = portfolio[t.stock.ticker_symbol]["shares_owned"] - t.shares_moved
                    if total_shares == 0:
                        del portfolio[t.stock.ticker_symbol]
                    else:
                        portfolio[t.stock.ticker_symbol] = { "stock": t.stock.to_dict(), "shares_owned": total_shares }

                elif t.transaction_type == "BUY":
                    total_shares = portfolio[t.stock.ticker_symbol]['shares_owned'] + t.shares_moved
                    portfolio[t.stock.ticker_symbol] = { "stock": t.stock.to_dict(), "shares_owned": total_shares }


        return portfolio

    def total_portfolio_value(self):
        port = self.calculate_portfolio()
        portfolio_list = [v['shares_owned'] * v['stock']['base_price'] for v in port.values()]

        return sum(portfolio_list)



    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'balance': self.balance,
            'portfolio': self.calculate_portfolio(),
            # {{self.calculate_portfolio(),}}
            'total_portfolio': self.total_portfolio_value()
        }
