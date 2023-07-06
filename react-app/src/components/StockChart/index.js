import { useSelector, useDispatch } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useParams } from "react-router-dom";
import "./StockChart.css"
import { useEffect } from "react";
import { VictoryChart, VictoryAxis, VictoryCandlestick, VictoryTheme } from 'victory';



function StockChart() {
    const dispatch = useDispatch()
    const id = useParams()

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch]);

    const stocks =
        useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : [])
        );
    const oneStock = stocks[Number(id.stockId)]


    //GENERATING STOCK DATA
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function generateStockData(basePrice, duration) {
        var stockData = [];
        var close = basePrice;
        var currentDate = new Date()

        for (var i = 0; i < duration; i++) {
            var open = +randomNumber(close * 0.95, close * 1.05).toFixed(2);
            var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
            var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
            var date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            stockData.unshift({
                x: date,
                open: open,
                close: close,
                high: high,
                low: low,

            });
            close = open; // Set the current close as the next open for the next iteration
        }

        return stockData;
    }

    const companyName = oneStock?.company_name
    const basePrice = oneStock?.base_price
    let daysToLookBack = 90 //90 is about the max you should go (1 quarter)
    let generatedStockData = generateStockData(basePrice, daysToLookBack)

    //

    return (
        <>
            <div className="company-name">{companyName}</div>
            <VictoryChart
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}>
                <VictoryAxis
                    label="Date"
                    style={{
                        axisLabel: { fontSize: 10, padding: 20 },
                        tickLabels: { fontSize: 10, padding: 5 },
                        grid: { stroke: "grey", size: 1 }
                    }}
                />
                <VictoryAxis dependentAxis
                    label="Stock Price"
                    style={{
                        axisLabel: { fontSize: 10, padding: 30 },
                        tickLabels: { fontSize: 10, padding: 5 },
                        grid: { stroke: "grey", size: 1 }
                    }} />
                <VictoryCandlestick
                    candleRatio={0.7}
                    candleColors={{ positive: "#449e48", negative: "#cc2f26" }}
                    data={generatedStockData}
                />
            </VictoryChart>
        </>
    )

}

export default StockChart
