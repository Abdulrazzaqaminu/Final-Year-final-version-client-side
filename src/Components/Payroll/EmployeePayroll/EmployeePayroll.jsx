import React from "react";
import SideNavBar from '../../SideNavBar/SideNavBar';
import Profile from '../../Profile/Profile';
import EmpPayHero from "./EmpPayHero/EmpPayHero";


const EmployeePayroll = () =>{
    return(
        <>
            <SideNavBar />
            <EmpPayHero />
            <Profile />
        </>
    )
}

export default EmployeePayroll