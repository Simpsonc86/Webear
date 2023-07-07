from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Watchlist, db, watchlists_stocks, Stock
from app.forms import WatchlistForm
from app.forms import AddStockToWatchlistForm

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/')
def landing():
    current_user_id = current_user.to_dict()["id"]
    watchlists = Watchlist.query.filter_by(user_id = current_user_id).all()

    watch_to_dict = [w.to_dict() for w in watchlists]

    return {w["id"]:w for w in watch_to_dict}

@watchlist_routes.route('/', methods=['POST'])
def add_Watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        watchlist = Watchlist(
            name = form.data['name'],
            user_id = form.data['user_id']
        )

        db.session.add(watchlist)
        db.session.commit()

        return watchlist.to_dict()
    return {'errors': ['Unauthorized']}, 401

@watchlist_routes.route('/<int:watchlist_id>/<int:stock_id>', methods=['DELETE'])
def delete_stock_from_watchlist(watchlist_id, stock_id):
    watchlist_to_delete = Watchlist.query.get(watchlist_id)
    stock_to_delete = Stock.query.get(stock_id)
    if stock_to_delete & watchlist_to_delete:
        stock = watchlists_stocks.delete().where((watchlists_stocks.c.watchlist_id > 2) & (watchlists_stocks.c.stock_id > 2))
        db.session.commit()
        watchlist = Watchlist.query.get(watchlist_id)
        return {watchlist.to_dict()}



@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_Watchlist(id):
    watchlist_to_delete = Watchlist.query.get(id)

    if watchlist_to_delete:
        db.session.delete(watchlist_to_delete)
        db.session.commit()
        return {"message": "successfully deleted"}

@watchlist_routes.route('/add_stock', methods=['POST'])
def add_stock_to_watchlist():
    form = AddStockToWatchlistForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    print("Gets to ROUTE")
    stock_id = form.data["stock_id"]
    watchlist_id = form.data["watchlist_id"]
    stock = Stock.query.get(stock_id)

    if form.validate_on_submit():
        ins = watchlists_stocks.insert().values(stock_id = stock_id, watchlist_id = watchlist_id)
        db.session.execute(ins)
        db.session.commit()
        return {"watchlistId": watchlist_id, "stock": stock.to_dict()}
