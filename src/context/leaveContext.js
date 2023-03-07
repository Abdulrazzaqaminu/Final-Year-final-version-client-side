import { createContext, useReducer } from "react";

export const LeaveContext = createContext();

export const leaveReducer = (state, action) => {
    switch (action.type) {
        case "GET_LEAVES" :
            return {
                leave: action.payload
            }
        case "REQUEST_LEAVE" :
            const req_leave = action.payload.leave;
            return {
                ...state,
                leave: [req_leave, ...state.leave]
            }
        default:
            return state
    }
}

export const LeaveContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(leaveReducer, {
        leave: null
    })

    return(
        <LeaveContext.Provider value={ {...state, dispatch} }>
            { children }
        </LeaveContext.Provider>
    )
}