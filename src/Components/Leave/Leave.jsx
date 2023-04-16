import React from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import LeaveHero from "./LeaveHero/LeaveHero";
import Profile from "../Profile/Profile";
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Leave = () => {
    const { loggedIn } = useContext(AuthContext);
    return (
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <LeaveHero />
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

export default Leave;