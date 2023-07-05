import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { NavLink } from "react-router-dom";
import "./StockSearchFilter.css"




export default function StockSearchFilter() {
    const dispatch = useDispatch()
    const stocks = useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : []));
    // console.log("Type of stocks is: ",typeof stocks);
    // console.log("These are the stocks from the store--->", stocks);
    const [searchList, setSearchList] = useState(stocks)
    const stockList = [];
    
    stocks.forEach((stock)=>{
        stockList.push(stock)
    })
    // console.log("Search list of stocks ",stockList);
    
    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);
    
    const filterSearch = (e) => {
        const query = e.target.value;
        // let newList = [...stockList]
        
        // console.log("This is the value of query",query);
            const newList = stockList.filter((stock) => stock.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        // console.log("this is the filtered list", newList);
        
        if (!query.length){
            setSearchList([]);
        }else setSearchList(newList)
      
    }
    // console.log("USE STATE STOCKS",searchList);
    
    return (
        <div className='search-filter'>
            <input className='search-field' onChange={filterSearch} placeholder='Search for a Stock'></input>
            <div className="search-list-stock">
                {searchList.map((stock, index) => (
                    <NavLink  key={index} to={`/`}>{stock.company_name}</NavLink>
                ))}
            </div>           
        </div>
    )
}

