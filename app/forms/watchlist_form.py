from flask_wtf import FlaskForm
from wtforms import StringField,  IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist

class WatchlistForm(FlaskForm):

    # def wathclist_name_check(form, field):
    #     name = field.data
    #     print("here", name)
    #     if not name:
    #         raise ValidationError('Name not provided')


    name = StringField("name", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
