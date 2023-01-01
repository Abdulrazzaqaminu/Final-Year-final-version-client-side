import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import EmpHero from './EmpHero/EmpHero';

const Employees = () =>{
    return(
        <>
            <SideNavBar />
            <EmpHero />
            <Profile />
        </>
    )
}

export default Employees;