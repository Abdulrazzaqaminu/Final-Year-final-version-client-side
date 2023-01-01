import React from 'react';
import './Profile.css';
import {Link} from 'react-router-dom'
import * as MdIcons from 'react-icons/md';

const Profile = () =>{
    return(
        <>
            <div className="profile">
                <div className="info">
                    <p><b>Abdulrazzaq</b></p>
                    <small className='text-muted'>Admin</small>
                </div>
                <Link to='/Account'>
                    <div className="profile-icon">
                        <MdIcons.MdManageAccounts /> 
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Profile;