import { useModal } from "../../context/Modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function StockModal() {

    const dispatch = useDispatch()

    const { closeModal } = useModal();


    return (
        <>
            <h1>Stock</h1>
        </>
    )
}

export default StockModal
