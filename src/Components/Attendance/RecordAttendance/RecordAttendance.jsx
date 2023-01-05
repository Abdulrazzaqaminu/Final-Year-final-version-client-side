import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import RecordHero from './RecordHero/RecordHero';
import Profile from '../../Profile/Profile';

const RecordAttendance = () =>{
    return(
        <>
            <SideNavBar />
            <RecordHero />
            <Profile />
        </>
    )
}

export default RecordAttendance;