from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable = False)
    transaction_type = db.Column(db.String, nullable = False)
    share_price = db.Column(db.Float, nullable = False)
    shares_moved = db.Column(db.Integer, nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    #relationship attributes
    stock = db.relationship("Stock", back_populates="transactions")
    user = db.relationship("User", back_populates="transactions")


    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "transaction_type": self.transaction_type,
            "share_price": self.share_price,
            "shares_moved": self.shares_moved,
            "user_id": self.user_id,
            "stock_id": self.stock_id
        }
