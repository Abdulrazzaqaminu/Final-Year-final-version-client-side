import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import PayrollHero from './PayrollHero/PayrollHero';

const Payroll = () =>{
    return(
        <>
            <SideNavBar />
            <PayrollHero />
            <Profile />
        </>
    )
}

export default Payroll;