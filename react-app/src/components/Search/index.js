import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { addStockToWatchlistThunk } from "../../store/watchlist";

// import { NavLink } from "react-router-dom";
import "./Search.css"

export default function Search({ watchlistId }) {
    const dispatch = useDispatch()
    const stocks = useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : []));
    // console.log("Type of stocks is: ",typeof stocks);
    // console.log("These are the stocks from the store--->", stocks);
    const [searchList, setSearchList] = useState([])

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);

    const filterSearch = (e) => {
        e.preventDefault()
        const query = e.target.value

        // console.log("This is the value of query",query);
        const newList = stocks.filter((stock) => stock.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        // console.log("this is the filtered list", newList);

        if (!query.length) {
            setSearchList([]);
        } else {
            setSearchList(newList)
        }

    }

    // const navigateToStock = (e) => {
    //     setSearchList([])
    //     e.target.value = ''
    // }

    // console.log("USE STATE STOCKS",searchList);
    // console.log(watchlistId)

    const handleAddStock = (stockId, stockName) => async (e) =>  {
        e.preventDefault()
        const data = await dispatch(addStockToWatchlistThunk(stockId,watchlistId))

        if (data?.error)
            window.alert("Please select a watchlist!")

        setSearchList([])
        document.getElementById("stockItem").value = ""


    }

    return (
        <div className='search-filter'>
            <input id="stockItem" className='search-field' onChange={filterSearch} onClick={handleAddStock} placeholder='Search for a Company'></input>
          {  searchList.length>0&&<div className="search-list-stock-x">
                {searchList.map((stock, index) => {

                    return (<div className="search"key={stock.id} value={stock.id} onClick={handleAddStock(stock.id, stock.company_name)}>{`${stock.company_name} (${stock.ticker_symbol})`}</div>)
                    //<OpenModalButton className="search" buttonText={stock.company_name } key={index} modalComponent={<StockModal/>} isLink={true} to={`/stocks/${stock.id - 1}`}></OpenModalButton>
                })}
            </div>}
        </div>
    )
}
