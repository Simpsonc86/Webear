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

    const navigateToStock = (e) => {
        setSearchList([])
        e.target.value = ''
    }

    // console.log("USE STATE STOCKS",searchList);

    return (
        <div className='search-filter'>
            <div className="search-input-div">

                <i class="fas fa-search"></i>
                <input className='search-field' onChange={filterSearch} onClick={navigateToStock} placeholder='Search for a Company'></input>
            </div>

            {!!searchList.length && <div className="search-list-stock-x">
                {searchList.map((stock, index) => (
                    <NavLink className="search-selection" key={index} onClick={navigateToStock} to={`/stocks/${stock.id - 1}`}>{stock.company_name}</NavLink>
                ))}
            </div>}
        </div>
    )
}

