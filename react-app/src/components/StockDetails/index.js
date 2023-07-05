import { useSelector, useDispatch } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useParams, NavLink } from "react-router-dom";
import "./StockDetails.css"
import { useEffect } from "react";

function StockDetails() {

    const dispatch = useDispatch()
    const id = useParams()
    // console.log("Id from params: ",id.stockId);

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);

    const stocks =
        useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : [])
        );

    console.log("These are the stocks from the store", stocks);
    const correctStock = stocks[Number(id.stockId)]
    console.log("This is the stock with the correct id", correctStock);
    // if(stocks){
    // }else{
    //     return<div>loading...</div>
    // }


    return (
        <>
            <h2 className="stock-details-title">Stock Details for {correctStock.company_name}</h2>
            <div className="stock-details-container">

                <NavLink className="stock-details-box" to={`/`}>
                    <div className="stock-details-title-div">
                        <h2 className="stock-details-symbol desc">{correctStock.ticker_symbol}</h2>
                        <h3 className="stock-details-name desc">{correctStock.company_name}</h3>
                        <h4 className="stock-details-price desc">Price: {correctStock.base_price} per share</h4>
                    </div>
                    <div className="stock-details-info-box">
                        <p className="stock-details-total-shares desc">Total Shares: {correctStock.total_shares}</p>
                        <p className="stock-details-shares-available desc">Shares Available for Purchase: {correctStock.available_shares}</p>

                    </div>

                </NavLink>
                <button className="buy-button">Buy Shares</button>

            </div>
        </>
    )
}

export default StockDetails;
