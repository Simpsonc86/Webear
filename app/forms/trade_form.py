from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Transaction

class TradeForm(FlaskForm):
    shares_moved = IntegerField('shares_moved', validators=[DataRequired()])
    stock_id = IntegerField('stock_id', validators=[DataRequired()])
    transaction_type = StringField('transaction_type', validators=[DataRequired()])
    share_price = FloatField('share_price', validators=[DataRequired()])
