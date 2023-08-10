import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { stockTransactionThunk } from "../../store/transaction";
import { getAllStocksThunk } from "../../store/stocks";
// import { authenticate } from "../../store/session";
import './index.css';
const Transaction = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const stocks = useSelector((state)=>state.stocks.stocks);


    const [shares_moved, setShares_moved] = useState(0)
    const [share_price, setShare_price] = useState("")
    const [transaction_type, setTransaction_Type] = useState("BUY")
    const [company, setCompany] = useState("")
    const [sellSelectStocks, setSellSelectStocks] = useState([])
    const [stocksOwned, setStocksOwned] = useState({})
    // const [stocksOwnedArr, setStocksOwnedArr] = useState([])


    let selectStocks = []
    // let ellSelectStocks = []

    for (let stock in stocks) {
        selectStocks.push({value: stocks[stock].id, label: `${stocks[stock].company_name} (${stocks[stock].ticker_symbol})`})
    }


    // for (let s of Object.values(sessionUser.portfolio)) {
    //     // ellSelectStocks.push({ value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` })
    //     // setSellSelectStocks([...sellSelectStocks, { value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` }])
    // }
    // for (let s of Object.values(sessionUser.portfolio)) {
    //     stocksOwned[s.stock.id] = { stock: s.stock, shares: s.shares_owned }

    // }
    // setSellSelectStocks([...sellSelectStocks, { value: 2, label: "bob" }])


    useEffect(() => {
        // console.log("hitting this")
        let ellSelectStocks=[]
        for (let s of Object.values(sessionUser.portfolio)) {
            ellSelectStocks.push({ value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` })
        }

        setSellSelectStocks(ellSelectStocks)

        let tocksOwned = []
        for (let s of Object.values(sessionUser.portfolio)) {
            tocksOwned[s.stock.id] = { stock: s.stock, shares: s.shares_owned }

        }
        setStocksOwned(tocksOwned)

        // let tocksOwned = {}
        // for (let s of Object.values(sessionUser.portfolio)) {
        //     tocksOwned[s.stock.id] = { stock: s.stock, shares: s.shares_owned }

        // }
        // setStocksOwned(tocksOwned)
    },[sessionUser.portfolio])

    useEffect(() => {
        dispatch(getAllStocksThunk());

    }, [dispatch,company,shares_moved,transaction_type,share_price]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const stock_id = company.id
        // console.log("BEGINNING",stock_id)
        // console.log("BEGGINING",stocksOwned[stock_id])
        let copyS = { ...stocksOwned }
        if (transaction_type === "SELL" && stocksOwned[stock_id].shares < shares_moved) {

            window.alert("You only own " + stocksOwned[stock_id].shares + " shares")

        }
        else {
            const transaction = {shares_moved, share_price, transaction_type, stock_id}

            if (transaction_type === "BUY" && stocksOwned[stock_id]) {
                // console.log(parseInt(parseInt(shares_moved) + stocksOwned[stock_id].shares))
                let newEntry = { stock: stocks[stock_id], shares: parseInt(shares_moved) + stocksOwned[stock_id].shares }

                setStocksOwned(prevState => ({
                    ...prevState,
                    [stock_id]: newEntry
                }))
            }
            else if (transaction_type === "BUY" && !stocksOwned[stock_id]){
                copyS[stock_id]={ stock: stocks[stock_id], shares: parseInt(shares_moved) }
                setStocksOwned({...copyS} )
                setSellSelectStocks([...sellSelectStocks, { value: stock_id, label: `${stocks[stock_id].company_name} (${stocks[stock_id].ticker_symbol})` }])
            }
            else if (transaction_type === "SELL") {

                copyS[stock_id].shares = copyS[stock_id].shares - parseInt(shares_moved)
                setStocksOwned( copyS )
            }
            if (copyS[stock_id].shares === 0) {
                delete copyS[stock_id]
                setStocksOwned(copyS)
                // console.log("gets here")
                setSellSelectStocks(sellSelectStocks.filter(stock => stock.value !== stock_id))

            }
            // console.log("END",stock_id)
            // console.log("END",stocksOwned[stock_id])
            dispatch(stockTransactionThunk(transaction))
            setShares_moved(0)



        }


    }




    return (
        <div>

            <form
            className = "transactionForm"onSubmit={handleSubmit}>
                <div>

                        <div className= "transType">

                            <label>
                                Trade Type
                            </label>
                            <select
                                name='trade_type'
                                onChange={e => {
                                    setTransaction_Type(e.target.value)
                                }}
                                value={transaction_type}
                            >
                                <option value='BUY'>Buy</option>
                                <option value='SELL'>Sell</option>
                            </select>
                        </div>
                        <div className= "transStock">

                            <label>
                                Stock
                            </label>
                            <select
                                name='stock'
                                onChange={e => {
                                    setCompany(stocks[e.target.value])
                                    setShare_price(stocks[e.target.value].base_price)
                                }}
                                value={company.id}
                            >
                                <option value='default' disabled selected hidden>Select a stock</option>
                                {transaction_type=== "BUY" ?
                                selectStocks.map((s) =>
                                    <option key = {s.value} value={s.value}>{s.label}</option>) :
                                sellSelectStocks.map((s) =>
                                    <option key={s.value} value={s.value}>{s.label}</option>)
                                }

                            </select>
                        </div>
                        <div className="transShares">
                        <label>
                            Shares
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Select number of shares"
                            value={shares_moved}
                            onChange={(e) => {
                                setShares_moved(e.target.value)
                            }}
                        />
    </div>
                    <div className="transAmount">
                        <label>
                            Total Amount
                        </label>
                        <input
                            type="text"
                            value={company && shares_moved ? (share_price*shares_moved).toFixed(2) : "0.00"}
                            // value={(share_price * shares_moved).toFixed(2)}
                            disabled="disabled"
                        />
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Transaction
