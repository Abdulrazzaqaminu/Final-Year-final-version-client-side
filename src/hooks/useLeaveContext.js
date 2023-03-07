import { LeaveContext } from "../context/leaveContext";
import { useContext } from "react";

export const useLeaveContext = () => {
    const context = useContext(LeaveContext);

    if(!context) {
        throw Error("useLeaveContext must be used inside a LeaveContextProvider");
    } else {
        return context;
    }
}