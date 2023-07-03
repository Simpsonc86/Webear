from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import AddToBalance

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/add_to_balance', methods=['PUT'])
def add_to_balance():
    form = AddToBalance()
    user = current_user

    print("please pring",user.balance)

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_balance = user.balance
        print("whatsgoingon",form.data['amount'])
        user.balance = current_balance+ form.data['amount']
        db.session.commit()
    return user.to_dict()
