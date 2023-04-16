import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import PayrollHero from './PayrollHero/PayrollHero';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Payroll = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <PayrollHero />
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

export default Payroll;