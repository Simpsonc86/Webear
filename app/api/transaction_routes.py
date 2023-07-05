from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Transaction, db
from app.forms import TradeForm
import datetime

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/current')
def current_Transactions():
    current_user_id = current_user.to_dict()["id"]
    transactions = Transaction.query.filter_by(user_id = current_user_id).all()
    trans_to_dict = [t.to_dict() for t in transactions]
    return {t["id"]:t for t in trans_to_dict}

@transaction_routes.route('/', methods=['POST'])
def trade():
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        transaction = Transaction(
            transaction_type=form.data['transaction_type'],
            shares_moved = form.data['shares_moved'],
            stock_id = form.data['stock_id'],
            user_id = current_user.to_dict()["id"],
            date = datetime.datetime.now(),
            share_price = form.data['share_price']
        )

        db.session.add(transaction)
        db.session.commit()

        return transaction.to_dict()
    return {'errors': ['Unauthorized']}, 401
