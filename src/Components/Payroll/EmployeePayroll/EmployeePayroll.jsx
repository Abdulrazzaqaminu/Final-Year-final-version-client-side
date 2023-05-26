import React from "react";
import SideNavBar from '../../SideNavBar/SideNavBar';
import Profile from '../../Profile/Profile';
import EmpPayHero from "./EmpPayHero/EmpPayHero";
import AuthContext from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const EmployeePayroll = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <EmpPayHero />
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

export default EmployeePayroll