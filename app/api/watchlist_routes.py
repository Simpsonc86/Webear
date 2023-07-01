from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Watchlist

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/')
def landing():
    current_user_id = current_user.to_dict()["id"]
    watchlists = Watchlist.query.filter_by(user_id = current_user_id).all()
    # for w in watchlists:
    #     for s in w.stocks:
    # print(watchlists[0].to_dict())
    # return {"watchlists": [w.to_dict() for w in watchlists]}
    watch_to_dict = [w.to_dict() for w in watchlists]

    return {w["id"]:w for w in watch_to_dict}
