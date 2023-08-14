import { useDispatch, useSelector } from "react-redux";
import { getWatchlistsThunk } from "../../store/watchlist";
import { useEffect, useState } from "react"
import { addWatchlistThunk } from "../../store/watchlist";
import { deleteWatchlistThunk } from "../../store/watchlist";
import "./index.css"
import Search from "../Search"
import OpenModalButton from "../OpenModalButton";
import WatchlistModal from "../WatchlistModal";

function Watchlists() {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [watchlistId, setWatchlistId] = useState(null);
    const [name, setName] = useState("")

    const watchlists = useSelector((state) => (state.watchlist.watchlists ? state.watchlist.watchlists : {}))
    const addedWatchlist = useSelector((state) => (state.watchlist?.watchlist ? state.watchlist.watchlist : {}))

    let watchlistNames = Object.values(watchlists)
    // console.log("Watchlist Array: ", watchlistNames);

    // let watchlistNames = []

    // for (let w in watchlists) {

    //     watchlistNames.push({ name: watchlists[w].name, id: watchlists[w].id })
    // }

    useEffect(() => {
        if (addedWatchlist.id) {
            setWatchlistId(addedWatchlist.id)
        }



    }, [addedWatchlist.id])


    useEffect(() => {
        dispatch(getWatchlistsThunk(sessionUser));

    }, [dispatch, sessionUser, watchlistId]);



    const handleNewWatchlist = async (e) => {
        e.preventDefault();
        const user_id = sessionUser.id
        const newWatchlist = { name, user_id }

        await dispatch(addWatchlistThunk(newWatchlist))

        // if (data.errors)
        //     window.alert("Your watchlist needs a name!")
        watchlistNames.push({ name: addedWatchlist.name, id: addedWatchlist.id })
        setName("")

    }

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteWatchlistThunk(watchlistId))

        setWatchlistId(null)
        document.getElementById("selectWatch").value = "default"

    }

    return (
        <div className="watchlistContainer">
            <div className="watchlistOuterDiv">
                <div className="watchlistInnerDiv">
                    <form className="watchlistAddList" onSubmit={handleNewWatchlist}>
                        <label><div>Add New Watchlist</div></label>
                        <input
                            className="watchlistInput"
                            type="watchlist_name"
                            placeholder="Watchlist name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />

                        <button className="watchlistSubmit" type="submit">Add Watchlist</button>
                    </form>

                </div>
            </div>
            &nbsp;

            <form className="watchlistSelectDiv" onSubmit={handleNewWatchlist}>
                <div className="watchlistSelect">
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
                        <option value='default' disabled selected hidden>Select a Watchlist</option>
                        {
                            watchlistNames.map((w) => {

                                return (<option key={w.id} value={w.id}>{w.name}</option>)
                            })
                        }

                    </select>
                </div>

            </form>
            <div className="deleteWatchlistDiv">
                <button className="deleteWatchlist" onClick={handleDelete}>Delete Watchlist</button>
            </div>
            &nbsp;
            {watchlists[watchlistId]?.stocks.length > 0 && <div className="populatedWatchlist">
                        Select a Stock from the Watchlist to Delete
                {watchlists &&
                    watchlists[watchlistId]?.stocks.map((s) => {

                        return (
                            <button className="watchlistStocks" key={s.id}>

                                <OpenModalButton watchlistId={watchlistId} stockId={s.id} modalComponent={<WatchlistModal watchlistId={watchlistId} stockId={s.id} />} isLink={true} 
                                    buttonText={
                                        <div className="watchlist_entry">
                                            <div className="company_name">{s.company_name}</div>
                                            <div className="watchlistTicker">{s.ticker_symbol}</div>
                                            <div className="price">${s.base_price} per share</div>
                                            {/* <div className="change">Todays Change%</div> */}
                                        </div>
                                    }

                                >
                                </OpenModalButton>
                            </button>
                        )
                    })

                }
                &nbsp;

            </div>}
            {/* {console.log("This is the watchlist for the add input ", watchlists, " watchlistId: ", watchlistId)} */}
            {watchlistId && <div className="watchlistAddStock">
                <label>{watchlistId ? `Add Stock to ${watchlistNames[watchlistNames.length - 1]?.name}` : `Select a watchlist from the list above`}</label>
                <Search watchlistId={watchlistId} />
            </div>}


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
