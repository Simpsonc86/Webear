const GET_WATCHLISTS = "watchlist/GET_WATCHLISTS"
const ADD_WATCHLIST = 'watchlist/ADD_WATCHLIST'
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST'
const ADD_STOCK_TO_WATCHLIST = 'watchlist/ADD_STOCK_TO_WATCHLIST'
const DELETE_STOCK_FROM_WATCHLIST = 'watchlist/DELETE_STOCK_FROM_WATCHLIST'

const deleteStockFromWatchlist = (watchlist) => ({
    type: DELETE_STOCK_FROM_WATCHLIST,
    watchlist
})

const addStockToWatchlist = (watchlistId, stock) => ({
    type: ADD_STOCK_TO_WATCHLIST,
    watchlistId,
    stock
})


const deleteWatchlist = (watchlistId) => ({
    type: DELETE_WATCHLIST,
    watchlistId

})

const addWatchlist = (watchlist) => ({
    type: ADD_WATCHLIST,
    watchlist
})

const getWatchlists = (watchlists) => ({
    type: GET_WATCHLISTS,
    watchlists
})

export const deleteStockFromWatchlistThunk = (stockId, watchlistId) => async (dispatch) => {
    const response = await fetch("/api/watchlist/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({stockId, watchlistId}),
    })
    if (response.ok) {

        const res = await response.json()


        dispatch(deleteStockFromWatchlist(res))
    }
}

export const addStockToWatchlistThunk = (stock_id, watchlist_id) => async (dispatch)=>{
    console.log("GET TO THunkdfdf")
    const response = await fetch("/api/watchlist/add_stock", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({stock_id, watchlist_id}),
    })

    if (response.ok) {

        const res = await response.json()


        dispatch(addStockToWatchlist(res.watchlistId, res.stock))
    }
}

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {

    const res = await fetch(`/api/watchlist/${watchlistId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteWatchlist(watchlistId))

    }
}

export const addWatchlistThunk = (watchlist) => async (dispatch) => {

    const response = await fetch("/api/watchlist/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlist),
    })

    if (response.ok) {

        const watchlist = await response.json()


        dispatch(addWatchlist(watchlist))
    }
}

export const getWatchlistsThunk = (currentUser) =>  async (dispatch) => {
    // const response = await fetch("/api/watchlists/", {
    const response = await fetch("/api/watchlist/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const watchlists = await response.json()



        dispatch(getWatchlists(watchlists))
    }
}



export default function reducer(state = { watchlists: {}, watchlist: {} }, action) {
    let newState = {}
    switch (action.type) {
        case GET_WATCHLISTS:
            return {watchlists: {...action.watchlists}, watchlist: {...state.watchlist}} ;
        case ADD_WATCHLIST:
            newState = { watchlists: { ...state.watchlists }, watchlist: { ...action.watchlist } }

            newState.watchlists[action.watchlist.id] = action.watchlist
            return newState;
        case DELETE_STOCK_FROM_WATCHLIST:
            newState = { watchlists: { ...state.watchlists }, watchlist: { ...action.watchlist } }

            newState.watchlists[action.watchlist.id] = action.watchlist
            return newState;
        case ADD_STOCK_TO_WATCHLIST:
            newState = { watchlists: { ...state.watchlists }, watchlist: { ...action.watchlist } }
            newState.watchlists[action.watchlistId].stocks.push(action.stock)
            return newState;
        case DELETE_WATCHLIST:
            const newWatchlists = { ...state.watchlists };
            delete newWatchlists[action.watchlistId]
            return { watchlists: { ...newWatchlists }, watchlist: {} }
        default:
            return state;
    }
}
