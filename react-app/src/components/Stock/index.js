import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useEffect } from "react"

function Stocks() {

    const dispatch = useDispatch()

    const stocks = Object.values(
        useSelector((state) => (state.stocks.stocks ? state.stocks.stocks : []))
    );



    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch, ]);



    return (
        <h1>a</h1>
    )
}

export default Stocks;
