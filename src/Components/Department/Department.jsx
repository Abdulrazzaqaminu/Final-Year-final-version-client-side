import React from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import Profile from '../Profile/Profile';
import DeptHero from './DeptHero/DeptHero';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'

const Department = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <DeptHero />
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

export default Department;