from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/current')
def current_Transactions():
    current_user_id = current_user.to_dict()["id"]
    transactions = Transaction.query.filter_by(user_id = current_user_id).all()
    trans_to_dict = [t.to_dict() for t in transactions]
    return {t["id"]:t for t in trans_to_dict}
