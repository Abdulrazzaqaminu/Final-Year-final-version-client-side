import React from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import LoansHero from "./LoansHero/LoansHero";
import Profile from "../Profile/Profile";
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Loans = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <LoansHero />
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

export default Loans;