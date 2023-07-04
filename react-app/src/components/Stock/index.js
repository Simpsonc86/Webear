import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useEffect } from "react"
import "./Stock.css"

function Stocks() {

    const dispatch = useDispatch()

    const stocks = Object.values(
        useSelector((state) => (state.stocks.stocks ? state.stocks.stocks : []))
    );


    console.log(stocks)
    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);



    return (
        <>
            <h1>All Stocks</h1>
            <div className="all-stock-container"> 
                {stocks.map((stock, index) => (
                    <div key={index}>
                        <h2></h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stocks;
