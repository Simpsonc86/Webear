import { useSelector, useDispatch } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { useParams } from "react-router-dom";
import "./StockChart.css"
import { useEffect, useState, useContext } from "react";
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory';


function StockChart() {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const dispatch = useDispatch()
    const id = useParams()

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch]);

    const stocks =
        useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : [])
        );
    const oneStock = stocks[Number(id.stockId)]

    //Helper functions
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

    const basePrice = oneStock?.base_price

    let daysToLookBack = 30
    if (selectedValue) { daysToLookBack = selectedValue }
    else daysToLookBack = 30


    //90 is about the max you should go (1 quarter), beyond that the graph starts to look a bit odd
    let generatedStockData = generateStockData(basePrice, daysToLookBack, 90)

    return (
        <>
            <select name="selectDuration" id="selectDuration" onChange={handleChange}>
                <option value="1">1 Day</option>
                <option value="7">7 Days</option>
                <option value="30" selected>30 Days</option>
                <option value="90">90 Days</option>
            </select>
            <VictoryChart
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}
                width={750}
                height={225}
                animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 }
                }}
            >

                <VictoryAxis
                    // label="Date"
                    style={{
                        // axisLabel: { fontSize: 16, padding: 20 },
                        tickLabels: { fontSize: 16, padding: 5 },
                        grid: { stroke: "grey", size: 1 }
                    }}
                />
                <VictoryAxis dependentAxis
                    // label="Stock Price"
                    style={{
                        // axisLabel: { fontSize: 16, padding: 35 },
                        tickLabels: { fontSize: 16, padding: 5 },
                        grid: { stroke: "grey", size: 1 },
                    }} />
                <VictoryCandlestick
                    candleRatio={0.7}
                    candleColors={{ positive: "#449e48", negative: "#cc2f26" }}
                    data={generatedStockData}
                />
            </VictoryChart >
        </>
    )

}

export default StockChart
