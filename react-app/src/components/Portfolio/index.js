import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserTransactionsThunk } from "../../store/transaction";


import "./index.css"

const Portfolio = () => {

    const dispatch = useDispatch();
    // console.log(sessionUser)

    const transactions = Object.values(
        useSelector((state) => (state.transaction.transactions ? state.transaction.transactions : []))
    );

    console.log(transactions)

    useEffect(() => {
        dispatch((getUserTransactionsThunk()));
    }, [dispatch]);
    return (
        <></>
    )

}

export default Portfolio
