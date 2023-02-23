import { DepartmentContext } from "../context/deptContext";
import { useContext } from "react";

export const useDepartmentContext = () => {
    const context = useContext(DepartmentContext);

    if(!context) {
        throw Error("useDepartmentContext must be used inside a DepartmentContextProvider");
    } else {
        return context;
    }
}