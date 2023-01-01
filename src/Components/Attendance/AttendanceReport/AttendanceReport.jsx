import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import Profile from "../../Profile/Profile";
import ReportHero from './ReportHero/ReportHero';

const AttendanceReport = () =>{
    return(
        <>
            <SideNavBar />
            <ReportHero />
            <Profile />
        </>
    )
}

export default AttendanceReport