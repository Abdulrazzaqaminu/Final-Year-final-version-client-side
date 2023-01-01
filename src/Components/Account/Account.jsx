import React from "react";
import SideNavBar from '../SideNavBar/SideNavBar';
import AccountHero from "./AccountHero/AccountHero";
import Profile from '../Profile/Profile';

const Account = () =>{
    return(
        <>
            <SideNavBar />
            <AccountHero />
            <Profile />
        </>
    )
}

export default Account;