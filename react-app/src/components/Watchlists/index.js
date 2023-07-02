import { useDispatch, useSelector } from "react-redux";
import { getWatchlistsThunk } from "../../store/watchlist";
import {useEffect} from "react"

function Watchlists() {

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // console.log(sessionUser)

    const watchlists = Object.values(
        useSelector((state) => (state.watchlist.watchlists ? state.watchlist.watchlists : []))
    );


    // console.log("finally", watchlists)
    useEffect(() => {
        dispatch(getWatchlistsThunk(sessionUser));
    }, [dispatch, sessionUser]);



    return (
        <h1>a</h1>
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
