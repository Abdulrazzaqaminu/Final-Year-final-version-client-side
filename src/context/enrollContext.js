import { createContext, useReducer } from "react";

export const EnrollContext = createContext();

export const enrollReducer = (state, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES" :
            return {
                enroll: action.payload
            }
        case "ENROLL_EMPLOYEE" :
            const enrolled = action.payload.enrolledEmployee;
            return {
                ...state,
                enroll: [enrolled, ...state.enroll]
            }
        default:
            return state
    }
}

export const EnrollContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(enrollReducer, {
        enroll: null
    })

    return(
        <EnrollContext.Provider value={ {...state, dispatch} }>
            { children }
        </EnrollContext.Provider>
    )
}