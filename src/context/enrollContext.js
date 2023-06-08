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
            if(Array.isArray(enrolled)) {
                const array1 = enrolled;
                const array2 = state?.enroll
                const joined = array1?.concat(array2)
                return {enroll: joined}
            } else {
                return {
                    ...state,
                    enroll: [enrolled, ...state.enroll]
                }
            }
        default:
            return state
    }
}

export const EnrollContextProvider = ({ children }) => {
    const [state, enrolldispatch] = useReducer(enrollReducer, {
        enroll: null
    })

    return(
        <EnrollContext.Provider value={ {...state, enrolldispatch} }>
            { children }
        </EnrollContext.Provider>
    )
}