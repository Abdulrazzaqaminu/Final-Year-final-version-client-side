import { createContext, useReducer } from "react";

export const UnitsContext = createContext();

export const unitsReducer = (state, action) => {
    switch (action.type) {
        case "ALL_UNITS" :
            // console.log(state)
            return {
                units: action.payload
            }
        case "CREATE_UNIT" :
            const new_unit_name = action.payload;
            // console.log(new_unit_name);
            // console.log(state.units)
            if(state.units === null) {
                return {
                    units: [new_unit_name]
                }
            } else {
                const existing_units = state.units.find((exits) => exits.unit_name === new_unit_name.unit_name);
                if(existing_units) {
                    return {...state}
                } else {
                    const new_unit = Object.values(new_unit_name);
                    if(new_unit.length > 0) {
                        if(new_unit_name?.unit_name !== undefined) {
                            return {
                                ...state, 
                                units: [new_unit_name,...state.units]
                            }
                        } else {
                            return {...state}
                            // const department_name = (new_unit_name.map((dept) => dept.dept_name))
                            // console.log(JSON.stringify(department_name));
                            // console.log("yes")
                        }
                    }
                    // if(department_name) {
                    //     console.log("match")
                    //     return {...state}
                    // } else {
                    //     console.log("no")
                    //     return {
                    //         ...state, 
                    //         units: [new_unit_name,...state.units]
                    //     }
                    // }
                }
            }
        case "EDIT_UNITS" :
            const unitsUpdated = action.payload;
            console.log(unitsUpdated)
            const Allunits = state.units?.map((unit) => {
                if (unit._id === unitsUpdated._id) {
                    return unitsUpdated;
                }
                return unit;
            });

            return {
                ...state,
                units: Allunits
            }
        case "DELETE_UNITS" :
            return {
                units: state.units.filter((units) => units._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const UnitsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(unitsReducer, {
        units: null
    })

    return(
        <UnitsContext.Provider value={ {...state, dispatch} }>
            { children }
        </UnitsContext.Provider>
    )
}