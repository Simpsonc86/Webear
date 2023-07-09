import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { stockTransactionThunk } from "../../store/transaction";
import { getAllStocksThunk } from "../../store/stocks";
import './index.css';
const Transaction = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const stocks = useSelector((state)=>state.stocks.stocks);


    const [shares_moved, setShares_moved] = useState("")
    const [share_price, setShare_price] = useState("")
    const [transaction_type, setTransaction_Type] = useState("BUY")
    const [company, setCompany] = useState("")
    const [sellSelectStocks, setSellSelectStocks] = useState([])




    let selectStocks = []
    // let ellSelectStocks = []

    for (let stock in stocks) {
        selectStocks.push({value: stocks[stock].id, label: `${stocks[stock].company_name} (${stocks[stock].ticker_symbol})`})
    }


    let stocksOwned = {}
    // for (let s of Object.values(sessionUser.portfolio)) {
    //     // ellSelectStocks.push({ value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` })
    //     // setSellSelectStocks([...sellSelectStocks, { value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` }])
    // }
    for (let s of Object.values(sessionUser.portfolio)) {
        stocksOwned[s.stock.id] = { stock: s.stock, shares: s.shares_owned }

    }
    // setSellSelectStocks([...sellSelectStocks, { value: 2, label: "bob" }])


    useEffect(() => {
        let ellSelectStocks=[]
        for (let s of Object.values(sessionUser.portfolio)) {
            ellSelectStocks.push({ value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` })

            // setSellSelectStocks([...sellSelectStocks, { value: s.stock.id, label: `${s.stock.company_name} (${s.stock.ticker_symbol})` }])
            // console.log(sellSelectStocks)
        }

        setSellSelectStocks(ellSelectStocks)
    },[])

    useEffect(() => {
        dispatch(getAllStocksThunk());

    }, [dispatch,company,shares_moved,transaction_type,share_price]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const stock_id = company.id



        console.log("stocks owned", stocksOwned[stock_id].shares)
        console.log("shares moved", shares_moved)


        if (transaction_type === "SELL" &&
            stocksOwned[stock_id].shares < shares_moved) {
            window.alert("You only own " + stocksOwned[stock_id].shares + " shares")
        }
        else {
            const transaction = {shares_moved, share_price, transaction_type, stock_id}

            if (transaction_type === "BUY")
                stocksOwned[stock_id].shares = stocksOwned[stock_id].shares + shares_moved
            else if (transaction_type === "SELL")
                stocksOwned[stock_id].shares = stocksOwned[stock_id].shares - shares_moved

            console.log("stocks owned", stocksOwned[stock_id].shares)
            console.log("shares moved", shares_moved)

            if (stocksOwned[stock_id].shares === 0) {
                delete stocksOwned[stock_id]
                setSellSelectStocks(sellSelectStocks.filter(stock => stock.value !== stock_id))
                // for (let i = 0; i < sellSelectStocks.length; i++) {
                //     if (sellSelectStocks[i].value === stock_id) {
                //         console.log("hereJPJDFLDKFJD")

                //         setSellSelectStocks(sellSelectStocks.filter(stock => item.name !== name))
                //         sellSelectStocks.splice(i,1)
                //         console.log(sellSelectStocks)
                //     }
                // }

                // setSellSelectStocks(ellSelectStocks)

            }

            setShares_moved(0)


            await dispatch(stockTransactionThunk(transaction))
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
