import React from 'react';
import '../../App.css'
import SideNavBar from '../SideNavBar/SideNavBar';
import Hero from './Hero/Hero';
import Profile from '../Profile/Profile';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Dashboard = () =>{
    const { loggedIn } = useContext(AuthContext);
    return(
        <>
            {loggedIn === true ? 
                (
                    <>
                        <SideNavBar />
                        <Hero />
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

export default Dashboard;