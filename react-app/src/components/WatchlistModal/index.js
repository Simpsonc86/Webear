import { useDispatch } from "react-redux";
import { useEffect} from "react"
import { useModal } from "../../context/Modal";

import "./index.css"

export default function WatchlistModal() {

    const { closeModal } = useModal();

    const deleteText = "Yes (Delete Stock)"

    const dontDeleteText = "No (Keep Stock)"


    const handleDelete = (e) => {
        e.preventDefault();

    }

    const handleNotDelete = (e) => {
        e.preventDefault();
        closeModal();
    }
    return (
        <div className="deleteConfirm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this stock
                from the watchlist?</p>
            <button class="yesDelete" onClick={handleDelete}>{deleteText}</button>
            <button class="noDelete" onClick={handleNotDelete}>{dontDeleteText}</button>

        </div>

    );
}
