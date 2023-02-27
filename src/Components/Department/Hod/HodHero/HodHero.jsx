import React, { useState } from "react";
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import './HodHero.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import axios from "axios";

const HodHero = () =>{
    const location = useLocation();
    const HOD_ID = location.pathname.split("/")[3];
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const {data, loading, reFetch} = useFetch(`http://127.0.0.1:4040/api/enrollment/${HOD_ID}`);

    const removeHOD = async (Hod_ID) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4040/api/hod/${Hod_ID}`)
            if(response) {
                navigate("/department");
            }
        } catch (error) {
            setError(error)
        }
    }
    return(
        <>
            <div className="single_employee_container">
                <div className="single_employee_update">
                    <form>
                        <div className="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                placeholder={data[0]?.phone_number}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Enrollment Date:</label>
                            <TextInput 
                                type="text"
                                placeholder={data[0]?.enrollment_date}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Position:</label>
                            <TextInput 
                                type="text"
                                placeholder={data[0]?.position}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Grade:</label>
                            <TextInput 
                                type="text"
                                placeholder={data[0]?.grade}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Annual Gross:</label>
                            <TextInput 
                                type="text"
                                placeholder={`NGN ${(data[0]?.gross_salary)?.toLocaleString()}`}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <TextInput 
                                type="text"
                                placeholder={`Status ${data[0]?.status}`}
                                disabled={true}
                            />
                        </div>
                    </form>
                </div>
                <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="remove" onClick= {() => removeHOD(data[0]?._id)}>Remove as HOD</Button>
                    </div>
                    <div className="single_employee_org_info">
                        <form>
                            <div className="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder={data[0]?.staff_ID} disabled/>
                            </div>
                            <div className="field">
                                <label>First Name:</label>
                                <input type="text" placeholder={data[0]?.first_name} disabled/>
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <input type="text" placeholder={data[0]?.last_name} disabled/>
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" className="email" placeholder={data[0]?.email} disabled/>
                            </div>
                            <div className="field">
                                <label>Department:</label>
                                <input type="text" placeholder={data[0]?.department} disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HodHero;