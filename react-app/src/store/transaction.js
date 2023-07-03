const GET_USER_TRANSACTIONS = "transaction/GET_USER_TRANSACTIONS"

const getUserTransactions = (transactions) => ( {
    type: GET_USER_TRANSACTIONS,
    transactions
})

export const getUserTransactionsThunk = () => async (dispatch) => {

    const response = await fetch("/api/transaction/current", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const transactions = await response.json()

        dispatch(getUserTransactions(transactions))
    }
}

export default function reducer(state = { transactions: {}, transaction: {} }, action) {
    switch (action.type) {
        case GET_USER_TRANSACTIONS:
            return { transactions: { ...action.transactions }, transaction: null };
        default:
            return state;
    }
}
