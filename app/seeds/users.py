from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='demopassword', balance = 29359.48)
    justin = User(
        username='justin', email='justint@aa.io', password='justinpassword', balance = 36661.97)
    johnny = User(
        username='johnny', email='johnd@aa.io', password='johnnypassword', balance = 4414.57)
    jennifer = User(
        username='jennifer', email ='jlo@aa.io', password='jenniferpassword', balance=97140.52)
    tom = User(
        username='tom', email ='tomcruise@aa.io', password='tompassword', balance=11620.82)
    morgan = User(
        username='morgan', email ='mfreeman@aa.io', password='morganpassword', balance=88825.54)
    brad = User(
        username='brad', email ='bpitt@aa.io', password='bradpassword', balance=15359.80)
    jackie = User(
        username='jackie', email ='jchan@aa.io', password='jackiepassword', balance=43950.25)
    nicolas = User(
        username='nicolas', email ='ncage@aa.io', password='nicolaspassword', balance=93742.00)
    taylor = User(
        username='taylor', email ='tswift@aa.io', password='taylorpassword', balance=74902.78)

    all_users = [demo, justin, johnny, jennifer, tom, morgan, brad, jackie, nicolas, taylor]

    _ = [db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
