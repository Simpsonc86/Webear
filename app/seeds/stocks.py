from app.models import db, User, environment, SCHEMA
import datetime
from ..models import Stock
from sqlalchemy.sql import text

def seed_stocks():

    alphabet = Stock(
        base_price='122.22', company_name='Alphabet', ticker_symbol='GOOGL', available_shares=100000, total_shares=1000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    tesla = Stock(
        base_price='272.22', company_name='Tesla', ticker_symbol='TSLA', available_shares=10000, total_shares=100000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    berkshire = Stock(
        base_price='822.22', company_name='Berkshire', ticker_symbol='BKSH', available_shares=200000, total_shares=2000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    apple = Stock(
        base_price='193.31', company_name='Apple', ticker_symbol='AAPL', available_shares=300000, total_shares=3000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    amazon = Stock(
        base_price='132.43', company_name='Amazon', ticker_symbol='AMZN', available_shares=400000, total_shares=4000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    jp_morgan = Stock(
        base_price='145.44', company_name='JPMorgan Chase', ticker_symbol='JPM', available_shares=500000, total_shares=5000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    nvidia = Stock(
        base_price='425.40', company_name='Nvidia Corporation', ticker_symbol='NVDA', available_shares=2100000, total_shares=23000000 , created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    amd = Stock(
        base_price='115.23', company_name='Advanced Micro Devices Inc', ticker_symbol='AMD', available_shares=225000, total_shares=250000 , created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    amc = Stock(
        base_price='4.54', company_name='Amc Entmt Hidgs Inc', ticker_symbol='AMC', available_shares=395000, total_shares=4200000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    meta = Stock(
        base_price='285.65', company_name='Meta Platforms Inc', ticker_symbol='META', available_shares=103000 , total_shares=1730000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    microsoft = Stock(
        base_price='336.68', company_name='Microsoft Corp', ticker_symbol='MSFT', available_shares=108000 , total_shares=1880000 , created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    ford = Stock(
        base_price='15.24', company_name='Ford Mtr Co Del', ticker_symbol='F', available_shares=100000 , total_shares=3000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    alibaba = Stock(
        base_price='84.39', company_name='Alibaba Group Hldg Ltd', ticker_symbol='BABA', available_shares=430000 , total_shares=1700000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    netflix = Stock(
        base_price='436.81', company_name='Netflix Inc', ticker_symbol='NFLX', available_shares=340000 , total_shares=500000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    bank_of_america = Stock(
        base_price='29.18', company_name='Bank of America', ticker_symbol='BAC', available_shares=650000 , total_shares=3500000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    paypal = Stock(
        base_price='68.04', company_name='Paypal Holdings', ticker_symbol='PYPL', available_shares=370000 , total_shares=1100000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    disney = Stock(
        base_price='90.15', company_name='Walt Disney', ticker_symbol='DIS', available_shares=120000 , total_shares=1160000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    walmart = Stock(
        base_price='158.13', company_name='Walmart', ticker_symbol='WMT', available_shares=110000 , total_shares=320000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    shopify = Stock(
        base_price='65.47', company_name='Shopify Inc', ticker_symbol='SHOP', available_shares=170000 , total_shares=600000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    ups = Stock(
        base_price='183.93', company_name='United Parcel', ticker_symbol='UPS', available_shares=22000 , total_shares=225000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    verizon = Stock(
        base_price='37.2', company_name='Verizon Comms', ticker_symbol='VZ', available_shares=89000, total_shares=767000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    qualcomm = Stock(
        base_price='119.77', company_name='Qualcomm Inc', ticker_symbol='QCOM', available_shares=46000 , total_shares=392000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    coinbase = Stock(
        base_price='79.36', company_name='Coinbase Global, Inc.', ticker_symbol='COIN', available_shares=190000 , total_shares=654000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    zoom = Stock(
        base_price='68.43', company_name='Zoom Video Communications', ticker_symbol='ZM', available_shares=70000 , total_shares=300000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    gamestop = Stock(
        base_price='24.84', company_name='Gamestop Corp', ticker_symbol='GME', available_shares=37000 , total_shares=311000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    general_motors = Stock(
        base_price='39.10', company_name='General Mtrs Co', ticker_symbol='GM', available_shares=45000 , total_shares=818000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    intel = Stock(
        base_price='33.32', company_name='Intel Corp', ticker_symbol='INTC', available_shares=230000 , total_shares=2160000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    starbucks = Stock(
        base_price='99.44', company_name='Starbucks Corp', ticker_symbol='SBUX', available_shares=32000 , total_shares=357000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    ebay = Stock(
        base_price='45.23', company_name='Ebay Inc.', ticker_symbol='EBAY', available_shares=9400 , total_shares=84000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    sofi = Stock(
        base_price='8.63', company_name='Sofi Technologies Inc', ticker_symbol='SOFI', available_shares=230000 , total_shares=2000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    roku = Stock(
        base_price='65.34', company_name='Roku', ticker_symbol='ROKU', available_shares=59000, total_shares=241000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    oracle = Stock(
        base_price='117.15', company_name='Oracle Corp', ticker_symbol='ORCL', available_shares=378000 , total_shares=4300000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    home_depot = Stock(
        base_price='310.02', company_name='Home Depot', ticker_symbol='HD', available_shares=180000, total_shares = 1450000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    lowes = Stock(
        base_price='224.59', company_name='Lowes Companies', ticker_symbol='LOW', available_shares=210000, total_shares = 1500000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    kellogg = Stock(
        base_price='68.55', company_name='Kellogg', ticker_symbol='K', available_shares=80000, total_shares = 1360000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    yelp = Stock(
        base_price='36.53', company_name='Yelp Inc', ticker_symbol='YELP', available_shares=33000, total_shares = 214000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    xerox = Stock(
        base_price='15.04', company_name='Xerox Holdings Corp', ticker_symbol='XRX', available_shares=65000, total_shares = 423000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    astrazeneca = Stock(
        base_price='65.25', company_name='Astrazeneca Plc', ticker_symbol='AZN', available_shares=2400000, total_shares = 16000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    pfizer = Stock(
        base_price='36.65', company_name='Pfizer', ticker_symbol='PFE', available_shares=1900000, total_shares = 14000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
    johnson_and_johnson = Stock(
        base_price='163.35', company_name='Johnson & Johnson', ticker_symbol='JNJ', available_shares=1300000, total_shares = 4000000, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())


    all_stocks = [alphabet, tesla, berkshire, apple, amazon, jp_morgan, nvidia, amd, amc, meta, microsoft, ford, alibaba,
                  netflix, bank_of_america, paypal, disney, walmart, shopify, ups, verizon, qualcomm, coinbase, zoom,
                  gamestop, general_motors, intel, starbucks, ebay, sofi, roku, oracle, home_depot, lowes, kellogg, yelp,
                  xerox, astrazeneca, pfizer, johnson_and_johnson]

    _ = [db.session.add(stock) for stock in all_stocks]
    db.session.commit()
    return all_stocks


def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
