import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useEffect, useState } from "react"
import "./Stock.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function Stocks() {

    const dispatch = useDispatch()

    const stocks = Object.values(
        useSelector((state) => (state.stocks.stocks ? state.stocks.stocks : []))
    );

    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);

    const switchFilter = (e) => {
        setSelectedValue(e.target.value)
    }
    switch (selectedValue) {
        case 'alphabetical':
            stocks.sort((s1, s2) => (s1.company_name > s2.company_name) ? 1 : (s1.company_name < s2.company_name) ? -1 : 0);
            break;
        case 'reverse':
            stocks.sort((s1, s2) => (s1.company_name < s2.company_name) ? 1 : (s1.company_name > s2.company_name) ? -1 : 0)
            break;
        case 'price-high':
            stocks.sort((s1, s2) => (s1.base_price < s2.base_price) ? 1 : (s1.base_price > s2.base_price) ? -1 : 0)
            break;
        case 'price-low':
            stocks.sort((s1, s2) => (s1.base_price > s2.base_price) ? 1 : (s1.base_price < s2.base_price) ? -1 : 0)
            break;
        case 'available-high':
            stocks.sort((s1, s2) => (s1.available_shares < s2.available_shares) ? 1 : (s1.available_shares > s2.available_shares) ? -1 : 0)
            break;
        case 'available-low':
            stocks.sort((s1, s2) => (s1.available_shares > s2.available_shares) ? 1 : (s1.available_shares < s2.available_shares) ? -1 : 0)
            break;
        default:
            stocks.sort((s1, s2) => (s1.id > s2.id) ? 1 : (s1.id < s2.id) ? -1 : 0);
    }



    return (
        <>
            <h2 className="all-stocks-title">All Stocks</h2>
            <div className="all-stocks-filter-div">
                <p>Sort By: </p>
                <select name="all-stocks-filter" className="all-stocks-filter" onChange={switchFilter}>
                    <option value="stock_id">Stock ID</option>
                    <option value="alphabetical">A-Z Company</option>
                    <option value="reverse">Z-A Company</option>
                    <option value="price-high">Price High</option>
                    <option value="price-low">Price Low</option>
                    <option value="available-high">Most Available</option>
                    <option value="available-low">Least Available</option>
                </select>
            </div>
            <div className="all-stock-container">

                {stocks.map((stock, index) => (
                    <NavLink key={index} className="stock-box" to={`/stocks/${stock.id - 1}`}>
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
