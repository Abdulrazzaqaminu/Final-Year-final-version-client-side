import { UnitsContext } from "../context/unitContext"; 
import { useContext } from "react";

export const useUnitContext = () => {
    const context = useContext(UnitsContext);

    if(!context) {
        throw Error("useDepartmentContext must be used inside a DepartmentContextProvider");
    } else {
        return context;
    }
}