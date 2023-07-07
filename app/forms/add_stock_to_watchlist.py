from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import InputRequired, DataRequired,NumberRange

class AddStockToWatchlistForm(FlaskForm):
    watchlist_id = IntegerField('watchlist_id',validators=[NumberRange(min=1, max=100, message="wathclist_id in range?")])
    stock_id = IntegerField('stock_id', validators=[DataRequired()])
