import React, { useContext, useState } from 'react';
import './Profile.css';
// import {Link} from 'react-router-dom'
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const Profile = () =>{
    const { getLoggedIn } = useContext(AuthContext)
    const [error, setError] = useState(null);
    let userDetails = JSON.parse(localStorage?.getItem('admin'));
    const [options, setOptions] = useState(false);

    const logOut = async () => {
        try {
            await axios.get("http://127.0.0.1:4040/api/log/logout");
            getLoggedIn();
            localStorage.clear();
        } catch (error) {
            setError(error);
        }
    }

    const confirmLogOut = (e) => {
        e.preventDefault()  
        confirmAlert({
            title: 'Confirm Logout',
            message: 'Logout?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => logOut()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }
    
    return(
        <>
            <div className="profile">
                <div className="info">
                    <p><b>{userDetails.first_name}</b></p>
                    <small className='text-muted'>Admin</small>
                </div>
                {/* <Link to='/Account'> */}
                    <div className="profile-icon" onClick={() => setOptions(!options)}>
                        <MdIcons.MdManageAccounts /> 
                    </div>
                {/* </Link> */}
                { options &&
                    <>
                        <div className="options">
                            <Link to='/Account'>
                                <p className='prof'>Profile <MdIcons.MdAccountCircle className='icon proficon'/></p>
                            </Link>
                            <p className='log' onClick={confirmLogOut}>
                                LogOut <FiIcons.FiLogOut className='icon logicon'/>
                            </p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Profile;