import React from "react";
import './EnrollmentHero.css'
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import validator from 'validator'
import axios from "axios";

const EnrollmentHero = () =>{
    const [staffid, setStaffid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('')

    const [dob, setDob] = useState("");
    const [department, setDepartment] = useState("");
    const [unit, setUnit] = useState("");
    const [position, setPosition] = useState("");
    const [grade, setGrade] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [enrollDate, setEnrollDate] = useState("");
    const [employee_type, setEmployee_Type] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [show, setShow] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    
    const first_name_capitalize = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const state_capitalize = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();
    const city_capitalize = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

    useEffect(() => {
        const startTime = () => {
        var day = new Date();
        var time = day.getTime()
        var timeOffSet = day.getTimezoneOffset()
        var current_day = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
        setEnrollDate(current_day);
        setTimeout(startTime, 1000);
        }
        startTime();
    }, [])

    const numberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setPhoneNumber(e.target.value);
        }
    };
    const Staff_IDnumberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setStaffid(e.target.value);
        }
    };
    const firstNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setFirstName(e.target.value);
        }
    };
    const lastNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setLastName(e.target.value);
        }
    };
    const statelettersOnly = (e) => {
        const regex = /^[a-zA-Z\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setState(e.target.value);
        }
    };
    const citylettersOnly = (e) => {
        const regex = /^[a-zA-Z\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setCity(e.target.value);
        }
    };
    const validateEmail = (e) => {
        var email = e.target.value
        const regex = /^[a-zA-Z@.\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEmail(e.target.value);
            if(!email){
                setEmailError('Required')
            }
            else if (validator.isEmail(email)) {
              setEmailError('')
            } else {
              setEmailError('Enter valid Email!')
            }
        }
    }
    const streetlettersOnly = (e) => {
        const regex = /^[a-zA-Z0-9\b\s]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setStreet(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://127.0.0.1:4040/api/enrollment", 
                {
                    staff_ID: staffid, first_name: first_name_capitalize, last_name: lastName, email: email, 
                    date_of_birth: dob, phone_number: phoneNumber, department: department, unit: unit, 
                    position: position, grade: grade, enrollment_date: enrollDate, employee_type: employee_type, 
                    address: {
                        state: state_capitalize,
                        city: city_capitalize,
                        street: street
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setError(null);
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
        }
    }

    
    return(
        <>
            {error &&
                (
                    <div className="error_message">
                        {error}
                    </div>
                )
            }
            {show ?
                (
                    <div className="success_message">
                        {success}
                    </div>
                ) :
                ("")
            }
            <div className="enrollment-container">
                <form action="" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Staff ID:</label>
                        <TextInput 
                            type="text"
                            value={staffid}
                            onChange={Staff_IDnumberOnly}
                            maxLength={4}
                            minLength = {4}
                            className = {emptyFields?.includes("staff_ID") ? "error" : ""}
                        />
                    </div>
                    <div className="field">
                        <label>First Name:</label>
                        <TextInput 
                            type="text"
                            value={firstName}
                            onChange={firstNamelettersOnly}
                            className = {emptyFields?.includes("first_name") ? "error" : ""}
                        />
                    </div>
                    <div className="field">
                        <label>Last Name:</label>
                        <TextInput 
                            type="text"
                            value={lastName}
                            onChange={lastNamelettersOnly}
                            className = {`last_name ${emptyFields?.includes("last_name") ? "error" : ""}`}
                        />
                    </div>
                    <div className="field ">
                        <label>Email:</label>
                        <TextInput 
                            type="text"
                            value={email}
                            className={`email ${emptyFields?.includes("emp_email") ? "error" : ""}`}
                            onChange={validateEmail}
                        />
                        <span className="email_span">
                            {emailError}
                        </span>
                    </div>
                    <div className="field dob">
                        <label>Date Of Birth:</label>
                        <TextInput 
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className = {emptyFields?.includes("date_of_birth") ? "error" : ""}
                        />
                    </div>
                    <div className="field ">
                        <label>Phone Number:</label>
                        <TextInput 
                            type="text"
                            value={phoneNumber}
                            onChange={numberOnly}
                            maxLength={11}
                            minLength = {11}
                            className = {emptyFields?.includes("phone_number") ? "error" : ""}
                        />
                    </div>
                    <div className="field selectables">
                        <div className="field">    
                            <label>Department:</label>
                            <select id="" value={department} className = {emptyFields?.includes("department") ? "error" : ""} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="" disabled hidden>Choose...</option>
                                <option value="ACCOUNTING AND FINANCE">ACCOUNTING AND FINANCE</option>
                                <option value="HUMAN RESOURCES">HUMAN RESOURCES</option>
                                <option value="INFORMATION AND TECHNOLOGY">INFORMATION AND TECHNOLOGY</option>
                                <option value="MARKETING AND SALES">MARKETING AND SALES</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>Unit:</label>
                            <select id="" value={unit} className = {emptyFields?.includes("unit") ? "error" : ""} onChange={(e) => setUnit(e.target.value)}>
                                <option value="" disabled hidden>Choose...</option>
                                <option value="AUDIT">AUDIT</option>
                                <option value="CUSTOMER SERVICE">CUSTOMER SERVICE</option>
                                <option value="HEALTH AND SAFETY">HEALTH AND SAFETY</option>
                                <option value="PROCUREMENT">PROCUREMENT</option>
                                <option value="RECRUITMENT">RECRUITMENT</option>
                            </select>
                        </div>

                        <div className="field ">
                            <label>Position:</label>
                            <select id="" value={position} className = {emptyFields?.includes("position") ? "error" : ""} onChange={(e) => setPosition(e.target.value)}>
                                <option value="" disabled hidden>Choose...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="field ">
                            <label>Grade:</label>
                            <select id="" value={grade} className = {emptyFields?.includes("grade") ? "error" : ""} onChange={(e) => setGrade(e.target.value)}>
                                <option value="" disabled hidden>Choose...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label>Enrollment date:</label>
                        <TextInput 
                            type="text"
                            value={enrollDate}
                            disabled={true}
                            className = {emptyFields?.includes("enrollment_date") ? "error" : ""}
                        />
                    </div>
                    <div className="field address">
                        <label>Employee Type:</label>
                        <select id="" value={employee_type} className = {emptyFields?.includes("employee_type") ? "error" : ""} onChange={(e) => setEmployee_Type(e.target.value)}>
                            <option value="" disabled hidden>Choose...</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Contracted">Contracted</option>
                        </select>
                    </div>
                    <div className="field address">
                        <label>Address:</label>
                        <TextInput 
                            type="text"
                            value={state}
                            onChange={statelettersOnly}
                            placeholder="state"
                            className = {emptyFields?.includes("state") ? "error" : ""}
                        />
                    </div>
                    <div className="field">
                    <TextInput 
                            type="text"
                            value={city}
                            onChange={citylettersOnly}
                            placeholder="city"
                            className = {emptyFields?.includes("city") ? "error" : ""}
                        />
                    </div>
                    <div className="field">
                    <TextInput 
                            type="text"
                            value={street}
                            onChange={streetlettersOnly}
                            placeholder="street"
                            className= {`street ${emptyFields?.includes("street") ? "error" : ""}`}
                            
                        />
                    </div>
                    <Button type="submit">Enroll</Button>
                </form>
            </div>   
        </>
    )
}

export default EnrollmentHero;