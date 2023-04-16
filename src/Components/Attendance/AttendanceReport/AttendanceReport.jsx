import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import Profile from "../../Profile/Profile";
import ReportHero from './ReportHero/ReportHero';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const AttendanceReport = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <ReportHero />
                        <Profile />
                    </>
                ):
                (
                    <Navigate replace={true} to="/login" />
                )
            }
        </>
    )
}

export default AttendanceReport