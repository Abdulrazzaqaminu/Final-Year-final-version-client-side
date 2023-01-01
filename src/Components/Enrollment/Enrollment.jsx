import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import EnrollmentHero from './EnrollmentHero/EnrollmentHero';
import Profile from '../Profile/Profile';

const Enrollment = () =>{
    return(
        <>
            <SideNavBar />
            <EnrollmentHero />
            <Profile />
        </>
    )
}

export default Enrollment;