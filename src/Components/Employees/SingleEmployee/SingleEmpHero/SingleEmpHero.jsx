import React from "react";
import { useState } from "react";
import './SingleEmpHero.css'
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import { useLocation } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';

const SingleEmpHero = () =>{
    const location = useLocation();
    const Employee_ID = location.pathname.split("/")[2];
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`);
    
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
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
                        <div className="field">
                            <label>Department:</label>
                            <TextInput 
                                type="text"
                                value={department}
                                placeholder = {data[0]?.department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Unit:</label>
                            <TextInput 
                                type="text"
                                value={unit}
                                placeholder = {data[0]?.unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                value={phone_number}
                                placeholder = {data[0]?.phone_number}
                                onChange={(e) => setPhone_Number(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Position:</label>
                            <TextInput 
                                type="text"
                                value={position}
                                placeholder = {data[0]?.position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Grade:</label>
                            <TextInput 
                                type="text"
                                value={grade}
                                placeholder = {data[0]?.grade}
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
                            <div className="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder = {data[0]?.staff_ID} disabled/>
                            </div>
                            <div className="field">
                                <label>First Name:</label>
                                <TextInput 
                                    type="text"
                                    value={first_name}
                                    placeholder = {data[0]?.first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <TextInput 
                                    type="text"
                                    value={last_name}
                                    placeholder = {data[0]?.last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" placeholder = {data[0]?.email} disabled/>
                            </div>
                            <div className="field">
                                <label>Status:</label>
                                <input type="text" placeholder = {data[0]?.status} disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmpHero;