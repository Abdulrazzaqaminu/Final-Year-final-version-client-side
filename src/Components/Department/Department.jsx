import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import DeptHero from './DeptHero/DeptHero';

const Department = () =>{
    return(
        <>
            <SideNavBar />
            <DeptHero />
            <Profile />
        </>
    )
}

export default Department;