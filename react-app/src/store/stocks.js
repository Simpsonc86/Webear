const GET_ALL_STOCKS = "stocks/GET_ALL_STOCKS"

const getAllStocks = (stocks) => ({
    type: GET_ALL_STOCKS,
    stocks
})

export const getAllStocksThunk = () => async (dispatch) => {

    const response = await fetch("/api/stocks/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const stocks = await response.json()

        dispatch(getAllStocks(stocks))
    }
}

export default function reducer(state = { stocks: {}, stock: {} }, action) {
    switch (action.type) {
        case GET_ALL_STOCKS:
            return { stocks: { ...action.stocks}, stock: null };
        default:
            return state;
    }
}
