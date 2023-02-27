import { EmployeeContext } from "../context/empContext";
import { useContext } from "react";

export const useEmpContext = () => {
    const context = useContext(EmployeeContext);

    if(!context) {
        throw Error("useEmpContext must be used inside a EmployeeContextProvider");
    } else {
        return context;
    }
}