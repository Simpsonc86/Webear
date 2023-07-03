from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class AddToBalance(FlaskForm):
    amount = FloatField('amount', validators=[DataRequired()])
