import React, { useState } from "react";
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import { confirmAlert } from 'react-confirm-alert'; // Import
import './HodHero.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../../../hooks/Fetch/useFetch';
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
    const confirmRemoveHod = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Remove ${data?.employee_details?.staff_ID} as HOD?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => removeHOD()
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
            <div className="single_employee_con">
                <div className="single_employee_innercon">
                    <div className="options">
                        { data?.employee_details?.status === "Terminated" ?
                            (""):
                            (
                                <ul>
                                    <li className="unenroll_button_hover" onClick={confirmRemoveHod}>Remove HOD</li>
                                </ul>
                            )
                        }
                    </div>
                    <div className="info">
                        <div className="top">
                            <form>
                                <div className="left">
                                    <div className="field">
                                        <label>Staff ID:</label>
                                        <p>{data?.employee_details?.staff_ID}</p>
                                    </div>
                                    <div className="field">
                                        <label>Name:</label>
                                        <p><b>{data?.employee_details?.last_name} </b>{data?.employee_details?.first_name}</p>
                                    </div>
                                    <div className="field">
                                        <label>Email:</label>
                                        <p>{data?.employee_details?.email}</p>
                                    </div>
                                    <div className="field">
                                        <label>Date of birth:</label>
                                        <p>{data?.employee_details?.date_of_birth}</p>
                                    </div>
                                    <div className="field">
                                        <label>Enorllment Date:</label>
                                        <p>{data?.employee_details?.enrollment_date}</p>
                                    </div>
                                    <div className="field">
                                        <label>Department:</label>
                                        <p>{data?.employee_details?.department}</p>
                                    </div>
                                    <div className="field">
                                        <label>Unit:</label>
                                        <p>{data?.employee_details?.unit}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="field">
                                        <label>Position:</label>
                                        <p>{data?.employee_details?.position}</p>
                                    </div>
                                    <div className="field">
                                        <label>Grade:</label>
                                        <p>{data?.employee_details?.grade}</p>
                                    </div>
                                    <div className="field">
                                        <label>Phone Number:</label>
                                        <p>{data?.employee_details?.phone_number}</p>
                                    </div>
                                    <div className="field">
                                        <label>Annual Gross:</label>
                                        <p>{`NGN ${(data?.employee_details?.gross_salary)?.toLocaleString()}`}</p>
                                    </div>
                                    <div className="field">
                                        <label>Employment Type:</label>
                                        <p>{data?.employee_details?.employee_type}</p>
                                    </div>
                                    <div className="field">
                                        <label>Address:</label>
                                        <p>{`${data?.employee_details?.address?.street}, ${data?.employee_details?.address?.city}, ${data?.employee_details?.address?.state}`}</p>
                                    </div>
                                    <div className="field">
                                        <label>Status:</label>
                                        <p className={
                                            data?.employee_details?.status === "Active" ? "active_status" :
                                            data?.employee_details?.status === "Leave" ? "leave_status" :
                                            data?.employee_details?.status === "Terminated" ? "terminated_status" : ""
                                        }>
                                            {data?.employee_details?.status}
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <form>
                        <div className="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                placeholder={data?.employee_details?.phone_number}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Enrollment Date:</label>
                            <TextInput 
                                type="text"
                                placeholder={data?.employee_details?.enrollment_date}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Position:</label>
                            <TextInput 
                                type="text"
                                placeholder={data?.employee_details?.position}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Grade:</label>
                            <TextInput 
                                type="text"
                                placeholder={data?.employee_details?.grade}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Annual Gross:</label>
                            <TextInput 
                                type="text"
                                placeholder={`NGN ${(data?.employee_details?.gross_salary)?.toLocaleString()}`}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <TextInput 
                                type="text"
                                placeholder={`${data?.employee_details?.status}`}
                                className = {data?.employee_details?.status == "Active" ? "green" : data?.employee_details?.status == "On Leave" ? "warning" : "error"}
                                disabled={true}
                            />
                        </div>
                    </form> */}
                </div>
                {/* <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="remove" onClick= {() => removeHOD(data?.employee_details?._id)}>Remove as HOD</Button>
                    </div>
                    <div className="single_employee_org_info">
                        <form>
                            <div className="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder={data?.employee_details?.staff_ID} disabled/>
                            </div>
                            <div className="field">
                                <label>First Name:</label>
                                <input type="text" placeholder={data?.employee_details?.first_name} disabled/>
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <input type="text" placeholder={data?.employee_details?.last_name} disabled/>
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" className="email" placeholder={data?.employee_details?.email} disabled/>
                            </div>
                            <div className="field">
                                <label>Department:</label>
                                <input type="text" placeholder={data?.employee_details?.department} disabled/>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default HodHero;