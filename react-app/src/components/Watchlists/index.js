import { useDispatch, useSelector } from "react-redux";
import { getWatchlistsThunk } from "../../store/watchlist";
import {useEffect, useState} from "react"
import { addWatchlistThunk } from "../../store/watchlist";
import { deleteWatchlistThunk } from "../../store/watchlist";
import "./index.css"

function Watchlists() {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [watchlistId, setWatchlistId] = useState(null);
    const [name, setName] = useState("")

    const watchlists = useSelector((state) => (state.watchlist.watchlists ? state.watchlist.watchlists : {}))
    const addedWatchlist = useSelector((state) => (state.watchlist?.watchlist ? state.watchlist.watchlist : {}))

    let watchlistNames = []

    for (let w in watchlists) {

        watchlistNames.push({name:watchlists[w].name, id:watchlists[w].id})
    }

    useEffect(() => {
        if (addedWatchlist.id)
        {
            setWatchlistId(addedWatchlist.id)
        }



    }, [addedWatchlist.id])


    useEffect(() => {
        dispatch(getWatchlistsThunk(sessionUser));

    }, [dispatch, sessionUser, watchlistId]);



    const handleNewWatchlist =  (e) => {
        e.preventDefault();
        const user_id = sessionUser.id
        const newWatchlist = {name, user_id}

        dispatch(addWatchlistThunk(newWatchlist))
        watchlistNames.push({name:addedWatchlist.name, id:addedWatchlist.id})
        setName("")

    }

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteWatchlistThunk(watchlistId))

        setWatchlistId(null)
        document.getElementById("selectWatch").value = "default"

    }

    return (
        <div>
            <form onSubmit={handleNewWatchlist}>
                <div>
                    <label>
                        Watchlist
                    </label>
                    <select id="selectWatch"
                        name='watchlist'
                        onChange={e => {
                            setWatchlistId(watchlists[e.target.value].id)

                        }}
                        value={watchlistId}
                    >
                        <option value='default' disabled selected hidden>Select a stock</option>
                        {
                            watchlistNames.map((w) => {

                                return (<option key={w.id} value={w.id}>{w.name}</option>) })
                        }

                    </select>
                </div>

            </form>
            <div >

                {
                    watchlists[watchlistId]?.stocks.map((s) => {

                        return (
                            <div className="watchlist_entry" key={s.id}>
                                <div className="company_name">{s.company_name}</div>
                                <div className="ticker">{s.ticker_symbol}</div>
                                <div className="price">{s.base_price}</div>
                                <div className="change">Todays Change%</div>
                            </div>
                        )
                    })

                }

            </div>
            <div>
                <div>
                    <form onSubmit={handleNewWatchlist}>
                        <label>Add New Watchlist</label>
                        <input
                            type="watchlist_name"
                            placeholder="Watchlist name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />

                        <button type="submit">Add Watchlist</button>
                    </form>

                </div>
            </div>
            <div>
                <button onClick={handleDelete}>Delete Watchlist</button>
            </div>
        </div>
    )
}

export default Watchlists;







// let response;
    // let r
    // const func = async () => {

    //     response = await fetch("/api/watchlist/", {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },


    // });
    //     r = await response.json()
    //     console.log(r)
    // }
    // func();
