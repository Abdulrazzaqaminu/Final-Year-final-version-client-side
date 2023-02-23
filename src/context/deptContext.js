import { createContext, useReducer } from "react";

export const DepartmentContext = createContext();

export const departmentReducer = (state, action) => {
    switch (action.type) {
        case "ALL_DEPARTMENTS" :
            return {
                departments: action.payload
            }
        case "CREATE_DEPARTMENT" :
            const new_dept_name = action.payload;
            const existing_dept = state.departments.find((exits) => exits.dept_name === new_dept_name.dept_name) ;
            if(existing_dept) {
                return {...state}
            } else {
                return {
                    ...state, 
                    departments: [new_dept_name,...state.departments]
                }
            }
        case "EDIT_DEPARTMENT" :
            const Departmentupdated = action.payload;
            const AllDepartments = state.departments.map((dept) => {
                if (dept._id === Departmentupdated._id) {
                    return Departmentupdated;
                }
                return dept;
            });

            return {
                ...state,
                departments: AllDepartments,
            }
        case "DELETE_DEPARTMENT" :
            return {
                departments: state.departments.filter((depts) => depts._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const DepartmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(departmentReducer, {
        departments: null
    })

    return(
        <DepartmentContext.Provider value={{...state, dispatch}}>
            { children }
        </DepartmentContext.Provider>
    )
}