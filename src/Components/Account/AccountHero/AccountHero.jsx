import React from "react";
import './AccountHero.css';
import * as MdIcons from 'react-icons/md';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

const AccountHero = () =>{
    const { getLoggedIn } = useContext(AuthContext);
    const [error, setError] = useState(null);
    let userDetails = JSON.parse(localStorage?.getItem('admin'));

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Admin");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }

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
            <div className="acct-hero_container">
                <div className="acct_update">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>First Name:</label>
                            <TextInput 
                                type="text"
                                value={firstName}
                                placeholder="Abdulrazzaq"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Last Name:</label>
                            <TextInput 
                                type="text"
                                value={lastName}
                                placeholder="Aminu"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Email:</label>
                            <TextInput 
                                type="text"
                                value={email}
                                placeholder="abdulrazzaqaminu@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className = "email"
                            />
                        </div>
                        <div className="field">
                            <label>Role:</label>
                            <TextInput 
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={true}
                                className="text-muted"
                            />
                        </div>
                        <div className="field">
                            <label>Password:</label>
                            <TextInput 
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
                <div className="acct_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="logout"
                            onClick = {confirmLogOut}
                        >Log Out</Button>
                    </div>
                    <div className="acct_org_info">
                        <form>
                            <div className="field">
                                <label>First Name:</label>
                                <input type="text" placeholder="Abdulrazzaq" name="enrollDate" disabled/>
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <input type="text" placeholder="Aminu" name="state" disabled/>
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" placeholder="abdulrazzaqaminu@gmail.com" className="email" name="state" disabled/>
                            </div>
                            <div className="field">
                                <label>Role:</label>
                                <input type="text" placeholder="Admin" name="Role" disabled/>
                            </div>
                            <div className="field">
                                <label>Password:</label>
                                <input type="text" placeholder="123456789" name="state" disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountHero;