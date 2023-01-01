import React from "react";
import './AccountHero.css';
import * as MdIcons from 'react-icons/md';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { useState } from "react";

const AccountHero = () =>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Role");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className="acct-hero_container">
                <div className="acct_update">
                    <form action="" onSubmit={handleSubmit}>
                        <div class="field">
                            <label>First Name:</label>
                            <TextInput 
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Last Name:</label>
                            <TextInput 
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Email:</label>
                            <TextInput 
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Role:</label>
                            <TextInput 
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={true}
                                className="text-muted"
                            />
                        </div>
                        <div class="field">
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
                    </div>
                    <div className="acct_org_info">
                        <form>
                            <div class="field">
                                <label>First Name:</label>
                                <input type="text" placeholder="Abdulrazzaq" name="enrollDate" disabled/>
                            </div>
                            <div class="field">
                                <label>Last Name:</label>
                                <input type="text" placeholder="Aminu" name="state" disabled/>
                            </div>
                            <div class="field">
                                <label>Email:</label>
                                <input type="text" placeholder="abdul@gmail.com" name="state" disabled/>
                            </div>
                            <div class="field">
                                <label>Role:</label>
                                <input type="text" placeholder="Admin" name="Role" disabled/>
                            </div>
                            <div class="field">
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