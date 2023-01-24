import React from "react";
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import './HodHero.css';

const HodHero = () =>{
    return(
        <>
            <div className="single_employee_container">
                <div className="single_employee_update">
                    <form>
                        <div class="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                placeholder="08156259871"
                                disabled={true}
                            />
                        </div>
                        <div class="field">
                            <label>Enrollment Date:</label>
                            <TextInput 
                                type="text"
                                placeholder="2023-01-12"
                                disabled={true}
                            />
                        </div>
                        <div class="field">
                            <label>Position:</label>
                            <TextInput 
                                type="text"
                                placeholder="3"
                                disabled={true}
                            />
                        </div>
                        <div class="field">
                            <label>Grade:</label>
                            <TextInput 
                                type="text"
                                placeholder="2"
                                disabled={true}
                            />
                        </div>
                        <div class="field">
                            <label>Address:</label>
                            <TextInput 
                                type="text"
                                placeholder="Abuja"
                                disabled={true}
                            />
                        </div>
                        <div class="field">
                            <TextInput 
                                type="text"
                                placeholder="No6, Amurie Omanze Street"
                                disabled={true}
                            />
                        </div>
                    </form>
                </div>
                <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="remove">Remove as HOD</Button>
                    </div>
                    <div className="single_employee_org_info">
                        <form>
                            <div class="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder="0001" disabled/>
                            </div>
                            <div class="field">
                                <label>First Name:</label>
                                <input type="text" placeholder="Abdulrazzaq" disabled/>
                            </div>
                            <div class="field">
                                <label>Last Name:</label>
                                <input type="text" placeholder="Aminu" disabled/>
                            </div>
                            <div class="field">
                                <label>Email:</label>
                                <input type="text" placeholder="abdulrazzaqaminu@gmail.com" disabled/>
                            </div>
                            <div class="field">
                                <label>Department:</label>
                                <input type="text" placeholder="IT" disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HodHero;