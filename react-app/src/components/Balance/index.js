import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToBalanceThunk } from "../../store/session";

const Balance = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const [amtToAdd, setAmtToAdd] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addToBalanceThunk(amtToAdd))
    }

    return (
        <div>
            <div>Balance: {sessionUser.balance}</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={amtToAdd}
                    onChange={(e) => {
                        setAmtToAdd(e.target.value)
                    }}
                />
                <button type="submit">New Spot</button>
            </form>
        </div>
    )
}

export default Balance
