import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import EmpHero from './EmpHero/EmpHero';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Employees = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                         <SideNavBar />
                        <EmpHero />
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

export default Employees;