import React, { useContext, useState } from 'react';
import './Profile.css';
import TextInput from "../TextInput/TextInput";
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const Profile = () =>{
    const [showAccount, setShowAccount] = useState(false);
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
            { error &&
                <div className='error_message'>
                    {error}
                </div>
            }
            <div className="profile">
                <div className="info">
                    <p><b>{userDetails?.first_name}</b></p>
                    <small className='text-muted'>Admin</small>
                </div>
                <div className="profile-icon" onClick={() => setOptions(!options)}>
                    <MdIcons.MdManageAccounts /> 
                </div>
                { options &&
                    <>
                        <div className="options">
                            <p className='prof' onClick={() => 
                                {
                                    setShowAccount(true);
                                    setOptions(false);
                                }
                            }>Profile <MdIcons.MdAccountCircle className='icon proficon'/></p>
                            <p className='log' onClick={confirmLogOut}>
                                LogOut <FiIcons.FiLogOut className='icon logicon'/>
                            </p>
                        </div>
                    </>
                }
            </div>
            { showAccount &&
                <div className='account_info'>
                    <span className="close"><MdIcons.MdOutlineCancel onClick={() => setShowAccount(false)} className="close_icon"/></span>
                    <form>
                        <div className="field">
                            <label>First Name:</label>
                            <p>{userDetails?.first_name}</p>
                        </div>
                        <div className="field">
                            <label>Last Name:</label>
                            <p><b>{userDetails?.last_name}</b></p>
                        </div>
                        <div className="field">
                            <label>Email:</label>
                            <p>{userDetails?.email}</p>
                        </div>
                        {/* <div className="field">
                            <label>Password:</label>
                            <p>{userDetails?.password.slice(0,31)}</p>
                            <p className='extra'>{userDetails?.password.slice(31, 60)}</p>
                        </div> */}
                        <div className="field">
                            <label>Logged In At:</label>
                            <p>{userDetails?.loggedIn}</p>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Profile;