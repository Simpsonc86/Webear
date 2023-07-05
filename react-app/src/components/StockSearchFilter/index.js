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
    const [searchList, setSearchList] = useState([])
    // const [filterQuery, setFilterQuery] = useState("")
    const stockList = [];
    
    stocks.forEach((stock)=>{
        stockList.push(stock)
    })
    // console.log("Search list of stocks ",stockList);
    
    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);
    
    const filterSearch = (e) => {
        e.preventDefault()
        const query = e.target.value
        // let newList = [...stockList]
        
        // console.log("This is the value of query",query);
            const newList = stockList.filter((stock) => stock.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        // console.log("this is the filtered list", newList);
        // if(!newList.length){
        // return(<div className="search">No results found</div>)}
        if (!query.length){
            setSearchList([]);
        }else {
            setSearchList(newList)
        }

        

        // onclick=setSearchList([])
        
    }
    const navigateToStock=(e)=>{
        setSearchList([])
        e.target.value=''
        // setFilterQuery('')
        
    }

    // console.log("USE STATE STOCKS",searchList);
    
    return (
        <div className='search-filter'>
            <input className='search-field' onChange={filterSearch} onClick={navigateToStock} placeholder='Search for a Company'></input>
            <div className="search-list-stock">
                {searchList.map((stock, index) => (
                    <NavLink  className="search"key={index} onClick={navigateToStock}to={`/stocks/${stock.id}`}>{stock.company_name}</NavLink>
                ))}
            </div>           
        </div>
    )
}

