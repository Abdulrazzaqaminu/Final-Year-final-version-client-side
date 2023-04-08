import { createContext, useReducer } from "react";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case "SINGLE_EMPLOYEE" :
            const Emp_Info = action.payload;
            return {
                employee: Emp_Info
            }
        default:
            return state
    }
    
}

export const EmployeeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(employeeReducer, {
        employee: null
    })

    return(
        <EmployeeContext.Provider value={ {...state, dispatch} }>
            { children }
        </EmployeeContext.Provider>
    )
}