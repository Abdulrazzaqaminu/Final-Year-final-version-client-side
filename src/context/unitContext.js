import { createContext, useReducer } from "react";

export const UnitsContext = createContext();

export const unitsReducer = (state, action) => {
    switch (action.type) {
        case "ALL_UNITS" :
            return {
                units: action.payload.unit
            }
        case "CREATE_UNIT" :
            const new_unit = action.payload.savedUnit;
            // const a = new_unit.unit?.map((unit) => unit._id)
            // console.log(a, "payload id")
            // const b = state.units.unit?.map((unit) => unit._id)
            // console.log(b, "state id")
            // console.log((a.filter(id => !b.includes(id))), "filtered")
            // const new_unit_mapped = new_unit.unit?.map((unit) => (unit))
            return {
                units: new_unit
            }
        case "EDIT_UNITS" :
            const unitsUpdated = action.payload.unitUpdated;
            const Allunits = state.units?.map((stateunit) => {
                if(stateunit._id === unitsUpdated._id) {
                    return unitsUpdated
                }
                return stateunit
            })
            // console.log({unit: Allunits, ...state})
            // console.log(Allunits)


            //  console.log({...state,
            //         units: Allunits})

            // const Allunits = state.units?.map((unit) => {
            //     if (unit._id === unitsUpdated._id) {
            //         return unitsUpdated;
            //     }
            //     return unit;
            // });
            return {
                ...state,
                units: Allunits
            }
        case "DELETE_UNITS" :
                // console.log(state?.units?.unit?.filter((unit) => unit?._id !== action.payload.delete_unit?._id), "state")
            return {
                units: state?.units?.filter((unit) => unit?._id !== action.payload.delete_unit?._id)
            }
        default:
            return state
    }
}

export const UnitsContextProvider = ({ children }) => {
    const [state, unitdispatch] = useReducer(unitsReducer, {
        units: null
    })

    return(
        <UnitsContext.Provider value={ {...state, unitdispatch} }>
            { children }
        </UnitsContext.Provider>
    )
}