import React from "react";
import SideNavBar from '../SideNavBar/SideNavBar';
import AccountHero from "./AccountHero/AccountHero";
import Profile from '../Profile/Profile';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Account = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <AccountHero />
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

export default Account;