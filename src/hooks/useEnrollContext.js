import { EnrollContext } from "../context/enrollContext";
import { useContext } from "react";

export const useEnrollContext = () => {
    const context = useContext(EnrollContext);

    if(!context) {
        throw Error("useEnrollContext must be used inside a EnrollContextProvider");
    } else {
        return context;
    }
}