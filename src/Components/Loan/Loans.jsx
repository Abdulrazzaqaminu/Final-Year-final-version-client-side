import React from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import LoansHero from "./LoansHero/LoansHero";
import Profile from "../Profile/Profile";

const Loans = () =>{
    return(
        <>
            <SideNavBar />
            <LoansHero />
            <Profile />
        </>
    )
}

export default Loans;