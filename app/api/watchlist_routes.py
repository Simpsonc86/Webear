from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Watchlist, db
from app.forms import WatchlistForm

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

@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_Watchlist(id):
    watchlist_to_delete = Watchlist.query.get(id)

    if watchlist_to_delete:
        db.session.delete(watchlist_to_delete)
        db.session.commit()
        return {"message": "successfully deleted"}
