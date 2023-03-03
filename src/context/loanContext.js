import { createContext, useReducer } from "react";

export const LoanContext = createContext();

export const loanReducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_LOANS" :
            return {
                loans: action.payload
            }
        case "LOAN_PAYMENT" :
            const req_loan = action.payload.savedLoan;
            return {
                ...state,
                loans: [req_loan, ...state.loans]
            }
        default:
            return state
    }
}

export const LoanContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loanReducer, {
        loans: null
    })

    return(
        <LoanContext.Provider value={ {...state, dispatch} }>
            { children }
        </LoanContext.Provider>
    )
}