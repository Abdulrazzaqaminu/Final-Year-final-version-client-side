import React from "react";
import { useState } from "react";
import './SingleEmpHero.css'
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";

const SingleEmpHero = () =>{
    const [department, setDepartment] = useState("");
    const [unit, setUnit] = useState("");
    const [position, setPosition] = useState("");
    const [grade, setGrade] = useState("");
    const [phone_number, setPhone_Number] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className="single_employee_container">
                <div className="single_employee_update">
                    <form action="" onSubmit={handleSubmit}>
                        <div class="field">
                            <label>Department:</label>
                            <TextInput 
                                type="text"
                                value={department}
                                required={true}
                                placeholder="IT"
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Unit:</label>
                            <TextInput 
                                type="text"
                                value={unit}
                                required={true}
                                placeholder="Network Engineer"
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                value={phone_number}
                                placeholder="08156259871"
                                required={true}
                                onChange={(e) => setPhone_Number(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Position:</label>
                            <TextInput 
                                type="text"
                                value={position}
                                placeholder="3"
                                required={true}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div class="field">
                            <label>Grade:</label>
                            <TextInput 
                                type="text"
                                value={grade}
                                required={true}
                                placeholder="2"
                                onChange={(e) => setGrade(e.target.value)}
                            />
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
                <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="uneroll">Unenroll</Button>
                    </div>
                    <div className="single_employee_org_info">
                        <form>
                            <div class="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder="0001" disabled/>
                            </div>
                            <div class="field">
                                <label>Name:</label>
                                <input type="text" placeholder="Abdulrazzaq Aminu" disabled/>
                            </div>
                            <div class="field">
                                <label>Email:</label>
                                <input type="text" placeholder="abdulrazzaqaminu@gmail.com" disabled/>
                            </div>
                            <div class="field">
                                <label>Department:</label>
                                <input type="text" placeholder="IT" disabled/>
                            </div>
                            <div class="field">
                                <label>Unit:</label>
                                <input type="text" placeholder="Network Engineer" disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmpHero;