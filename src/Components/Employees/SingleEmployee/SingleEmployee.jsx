import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import SingleEmpHero from './SingleEmpHero/SingleEmpHero';
import Profile from '../../Profile/Profile';

const SingleEmployee = () =>{
    return(
        <>
            <SideNavBar />
            <SingleEmpHero />
            <Profile />
        </>
    )
}

export default SingleEmployee;