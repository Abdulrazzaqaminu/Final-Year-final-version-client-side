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
            const new_unit = action.payload;
            const existing_unit_names = JSON.stringify(state.units.map((unit) => unit.unit_name));
            const existing_dept_names = JSON.stringify(state?.units.map((dept) => dept.dept.dept_name));
            const existing_unit_current_dept = state.units.find((exits) => exits.unit_name === new_unit.unit_name);
            const payload_dept_name = new_unit?.dept?.dept_name;
            // console.log(new_unit.Message === "department name already exists")
            // console.log(new_unit)
            // console.log(existing_unit_current_dept)
            // if((existing_dept_names)){
            //     console.log("yes")
            // } else {
            //     console.log("no")
            // }

            const new_unit_name = Object.values(new_unit);
            if(state.units.length === 0) {
                console.log("empty array")
                if(new_unit?.Message === "unit name already exists") {
                    return {...state}
                    // console.log("A unit in a different dept has the same name");
                } else if (new_unit?.Message === "department name already exists") {
                    return {...state}
                    // console.log("dept has the same name");
                } else if(new_unit.unit_name){
                    return {
                        units: [new_unit]
                    }
                }
            } else {
                if(existing_unit_current_dept) {
                    return {...state}
                    // console.log("same unit name")
                } else {
                    if(new_unit_name.length > 0) {
                        if(!existing_dept_names.includes(payload_dept_name)) {
                            return {...state}
                        } else if(new_unit.unit_name !== undefined) {
                            return {
                                ...state, 
                                units: [new_unit,...state.units]
                            }
                            // console.log(new_unit)
                            // console.log("unique")
                        } else {
                            return {...state}
                            // console.log(new_unit)
                            // console.log("same as department")
                        }
                    }
                }

                // if(existing_dept_names.includes(payload_dept_name)) {
                //     console.log("A unit in this dept has the same name")
                    
                // } else {
                //     console.log("A unit in a different dept has the same name")
                // }
            }
 
        case "EDIT_UNITS" :
            const unitsUpdated = action.payload;
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
                units: state.units.filter((units) => units?._id !== action.payload?._id)
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