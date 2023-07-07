import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactionsThunk } from "../../store/transaction";
import "./PortfolioChart.css"
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory';

function PortfolioChart() {

    const sessionUser = useSelector(state => state.session.user);
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const dispatch = useDispatch()
    const transactions = Object.values(
        useSelector((state) => (state.transaction.transactions ? state.transaction.transactions : []))
    );

    let portfolio = {}

    for (let t of transactions) {
        if (!portfolio[t.stock.ticker_symbol])
            portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: t.shares_moved }

        else {
            if (t.transaction_type === "SELL") {
                let totalShares = portfolio[t.stock.ticker_symbol].sharesOwned - t.shares_moved

                if (totalShares === 0)
                    delete portfolio[t.stock.ticker_symbol]
                else
                    portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: totalShares }
            }
            else if (t.transaction_type === "BUY") {
                let totalShares = portfolio[t.stock.ticker_symbol].sharesOwned + t.shares_moved
                portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: totalShares }
            }
        }
    }

    let portfolioList = Object.values(portfolio)
    // console.log(portfolioList)

    function sumPortfolio(portfolioList) {
        let portfolioSum = 0;
        for (let i = 0; i < portfolioList.length; i++) {
            portfolioSum += (portfolioList[i].sharesOwned * portfolioList[i].stock.base_price)
        }
        return portfolioSum
    }

    let portfolioValue = sumPortfolio(portfolioList).toFixed(2)

    useEffect(() => {
        dispatch((getUserTransactionsThunk()));
    }, [dispatch]);

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function dateMinusTime(date, milliseconds) {
        var subtractedDate = new Date(date.getTime() - milliseconds)
        return subtractedDate
    }

    //Generating Stock Data
    function generateStockData(basePrice, duration, points) {
        var stockData = [];
        var close = basePrice;
        var currentDate = new Date();

        //interval is time between points, which changes based on the number of points
        //because duration is in days, convert to milliseconds:
        //days * hours * minutes * seconds * milliseconds
        var interval = (duration * 24 * 60 * 60 * 1000) / points

        for (var i = 0; i < points; i++) {
            var open = +randomNumber(close * 0.95, close * 1.05).toFixed(2);
            var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
            var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
            var date = new Date(currentDate);

            let subtractedDate = dateMinusTime(date, (i * interval))
            stockData.unshift({
                x: subtractedDate,
                open: open,
                close: close,
                high: high,
                low: low,
            });
            close = open; // Set the current close as the next open for the next iteration
        }

        return stockData;
    }

    let daysToLookBack = 30
    if (selectedValue) { daysToLookBack = selectedValue }
    else daysToLookBack = 30
    let basePrice = portfolioValue
    //90 is about the max you should go (1 quarter), beyond that the graph starts to look a bit odd
    let generatedStockData = generateStockData(basePrice, daysToLookBack, 90)

    return (
        <>
            <div id="select-duration-div">
                <select name="selectDuration" id="selectDuration" onChange={handleChange}>
                    <option value="1">1 Day</option>
                    <option value="7">7 Days</option>
                    <option value="30" selected>30 Days</option>
                    <option value="90">90 Days</option>
                </select>
                {sessionUser && <h3>Total Market Value of {sessionUser.username}'s Stock Portfolio: ${portfolioValue}</h3>}
            </div>
            <div className="portfolio-victory-chart">
                <VictoryChart
                    domainPadding={{ x: 25 }}
                    scale={{ x: "time" }}
                    width={1300}
                    height={600}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                    }}
                    className="meme"
                >
                    <VictoryAxis
                        // label="Date"
                        style={{
                            // axisLabel: { fontSize: 16, padding: 20 },
                            tickLabels: { fontSize: 12, padding: 5 },
                            grid: { stroke: "grey", size: 1 }
                        }}
                    />
                    <VictoryAxis dependentAxis
                        // label="Stock Price"
                        style={{
                            // axisLabel: { fontSize: 16, padding: 35 },
                            tickLabels: { fontSize: 12, padding: 10 },
                            grid: { stroke: "grey", size: 1 },
                        }} />
                    <VictoryCandlestick
                        candleRatio={0.8}
                        candleColors={{ positive: "#00c288", negative: "#ff526d" }}
                        data={generatedStockData}
                    />
                </VictoryChart >
            </div>
        </>
    )

}

export default PortfolioChart
