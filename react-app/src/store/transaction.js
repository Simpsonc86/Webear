const GET_USER_TRANSACTIONS = "transaction/GET_USER_TRANSACTIONS"
const STOCK_TRANSACTION = "transaction/STOCK_TRANSACTION"

const stockTransaction = (transaction) => ({
    type: STOCK_TRANSACTION,
    transaction
})

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

export const stockTransactionThunk = (transaction) => async (dispatch) => {

    const response = await fetch("/api/transaction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
    })

    if (response.ok) {

        const trans = await response.json()

        dispatch(stockTransaction(trans))
    }
}

export default function reducer(state = { transactions: {}, transaction: {} }, action) {
    switch (action.type) {
        case GET_USER_TRANSACTIONS:
            return { transactions: { ...action.transactions }, transaction: null };
        case STOCK_TRANSACTION:
            let newState = { transactions: { ...state.transactions }, transaction: {...action.transaction}}
            newState.transactions[action.transaction.id] = action.transaction
            return newState;
        default:
            return state;
    }
}
