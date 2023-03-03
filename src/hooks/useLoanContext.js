import { LoanContext } from "../context/loanContext";
import { useContext } from "react";

export const useLoanContext = () => {
    const context = useContext(LoanContext);

    if(!context) {
        throw Error("useLoanContext must be used inside a LoanContextProvider");
    } else {
        return context;
    }
}