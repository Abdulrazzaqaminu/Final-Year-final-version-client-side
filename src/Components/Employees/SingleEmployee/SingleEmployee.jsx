import React from 'react';
import SideNavBar from '../../SideNavBar/SideNavBar';
import SingleEmpHero from './SingleEmpHero/SingleEmpHero';
import Profile from '../../Profile/Profile';
import AuthContext from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const SingleEmployee = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
               {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <SingleEmpHero />
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

export default SingleEmployee;