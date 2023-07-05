import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToBalanceThunk } from "../../store/session";
import { authenticate } from "../../store/session";

const Balance = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const [amtToAdd, setAmtToAdd] = useState(0)
    const [balance, setBalance] = useState(sessionUser.balance)

    // useEffect(() => {

    //     console.log("in useeffect",balance)

    // },[setBalance])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addToBalanceThunk(amtToAdd))
        setBalance(balance + Number(amtToAdd))
        // await dispatch(authenticate(sessionUser))

        // await setBalance(sessionUser.balance)

    }

    return (
        <div>
            <div>Balance: {balance?.toFixed(2)}</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={amtToAdd}
                    onChange={(e) => {
                        setAmtToAdd(e.target.value)

                    }}
                />
                <button type="submit">Add to balance</button>
            </form>
        </div>
    )
}

export default Balance
