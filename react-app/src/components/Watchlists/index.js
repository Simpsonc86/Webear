import { useDispatch, useSelector } from "react-redux";
import { getWatchlistsThunk } from "../../store/watchlist";
import {useEffect, useState} from "react"
import "./index.css"

function Watchlists() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // console.log(sessionUser)

    const [watchlistId, setWatchlistId] = useState(1);

    const watchlists = useSelector((state) => (state.watchlist.watchlists ? state.watchlist.watchlists : {}))

    let watchlistNames = []

    for (let w in watchlists) {

        watchlistNames.push({name:watchlists[w].name, id:watchlists[w].id})
    }



    useEffect(() => {
        dispatch(getWatchlistsThunk(sessionUser));
    }, [dispatch, sessionUser, watchlistId]);



    return (
        <div>
            <form onSubmit={console.log("")}>
                <div>
                    <label>
                        Watchlist Name
                    </label>
                    <select
                        name='watchlist'
                        onChange={e => {
                            setWatchlistId(watchlists[e.target.value].id)
                            console.log(e.target.value)
                        }}
                        value={watchlistId}
                    >
                        {
                            watchlistNames.map((w) =>
                                <option key={w.id} value={w.id}>{w.name}</option>)
                        }

                    </select>
                </div>
                <div>

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
            </form>
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
