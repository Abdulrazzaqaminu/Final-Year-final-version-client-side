import { createContext, useReducer } from "react";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case "SINGLE_EMPLOYEE" :
            const Emp_Info = action.payload;

            const employee_ID = Emp_Info?.map((emp) => emp._id)
            const staff_ID = Emp_Info?.map((emp) => emp.staff_ID)
            const first_name = Emp_Info?.map((emp) => emp.first_name)
            const last_name = Emp_Info?.map((emp) => emp.last_name)
            const email = Emp_Info?.map((emp) => emp.email)
            const status = Emp_Info?.map((emp) => emp.status)
            const department = Emp_Info?.map((emp) => emp.department)
            const unit = Emp_Info?.map((emp) => emp.unit)
            const phone_number = Emp_Info?.map((emp) => emp.phone_number)
            const position = Emp_Info?.map((emp) => emp.position)
            const grade = Emp_Info?.map((emp) => emp.grade)
            return {
                employee: {
                    employee_ID, staff_ID, first_name, last_name, email, status, department, unit, phone_number, position, grade
                }
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