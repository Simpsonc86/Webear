import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useEffect } from "react"
import "./Stock.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function Stocks() {

    const dispatch = useDispatch()

    const stocks = Object.values(
        useSelector((state) => (state.stocks.stocks ? state.stocks.stocks : []))
    );



    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);



    return (
        <>
            <h1 className="all-stocks-title">All Stocks</h1>
            <div className="all-stock-container">
      
                {stocks.map((stock, index) => (
                    <NavLink key={index} className="stock-box" to={`/`}>
                        <div className="stock-title-div">
                            <h2 className="stock-symbol desc">{stock.ticker_symbol}</h2>
                            <h3 className="stock-name desc">{stock.company_name}</h3>
                        </div>

                        <h4 className="stock-price desc">Price: {stock.base_price} per share</h4>
                        <p className="stock-total-shares desc">Total Shares: {stock.total_shares}</p>
                        <p className="stock-shares-available desc">Shares Available for Purchase: {stock.available_shares}</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Stocks;
