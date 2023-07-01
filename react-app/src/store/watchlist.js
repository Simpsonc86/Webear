const GET_WATCHLISTS = "watchlist/GET_WATCHLISTS"

const getWatchlists = (watchlists) => ({
    type: GET_WATCHLISTS,
    watchlists
})


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
    switch (action.type) {
        case GET_WATCHLISTS:
            return {watchlists: {...action.watchlists}, watchlist: null} ;
        default:
            return state;
    }
}
