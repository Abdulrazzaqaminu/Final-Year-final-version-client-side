import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import RecordHero from './RecordHero/RecordHero';
import Profile from '../../Profile/Profile';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const RecordAttendance = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <RecordHero />
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

export default RecordAttendance;