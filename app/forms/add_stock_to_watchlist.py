from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class AddStockToWatchlistForm(FlaskForm):
    watchlist_id = IntegerField('watchlist_id', validators=[DataRequired()])
    stock_id = IntegerField('stock_id', validators=[DataRequired()])
