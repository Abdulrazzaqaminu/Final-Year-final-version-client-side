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
            const new_unit = action.payload.savedUnit;
            return {
                ...state, 
                units: [new_unit,...state.units]
            }
        case "EDIT_UNITS" :
            const unitsUpdated = action.payload.unitUpdated;
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
                units: state.units.filter((units) => units?._id !== action.payload.delete_unit?._id)
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