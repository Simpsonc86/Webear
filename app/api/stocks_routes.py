from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('/')
def all_stocks():
    stocks = Stock.query.all()
    stocks_to_dict = [s.to_dict() for s in stocks]
    return {s["id"]:s for s in stocks_to_dict}
