import { useDispatch } from "react-redux";
// import { useEffect} from "react"
import { useModal } from "../../context/Modal";
import { deleteStockFromWatchlistThunk } from "../../store/watchlist";

import "./index.css"

export default function WatchlistModal({stockId, watchlistId}) {

    const { closeModal } = useModal();

    const dispatch = useDispatch();




    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteStockFromWatchlistThunk(watchlistId, stockId))
        //console.log(watchlistId)
        closeModal()


    }

    const handleNotDelete = (e) => {
        e.preventDefault();
        //console.log(stockId)
        closeModal();
    }
    return (
        <div className="deleteConfirm">
            <div>Delete?</div>
            <button className="yesDelete" onClick={handleDelete}>Yes</button>
            <button className="noDelete" onClick={handleNotDelete}>No</button>

        </div>

    );
}
