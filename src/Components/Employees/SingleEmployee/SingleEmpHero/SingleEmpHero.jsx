import React from "react";
import { useState, useEffect } from "react";
import './SingleEmpHero.css'
import * as MdIcons from 'react-icons/md';
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmpContext } from "../../../../hooks/useEmpContext"
import axios from "axios"

const SingleEmpHero = () =>{
    const location = useLocation();
    const Employee_ID = location.pathname.split("/")[2];
    const {employee, dispatch} = useEmpContext()
    const navigate = useNavigate()

    const [moveStaff_ID, setMoveStaff_ID] = useState("");
    const [moveUnit, setMoveUnit] = useState("");
    const [moveDept, setMoveDept] = useState("");
    const [click, setClick] = useState(false)

    const [position, setPosition] = useState("")
    const [grade, setGrade] = useState("")
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [show, setShow] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    
    const [loading, setLoading] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`);
                dispatch({type: "SINGLE_EMPLOYEE", payload: response.data})
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchDepartments();
    }, []);

    const transferWindow = () => {
        setClick(current => !current)
        setMoveStaff_ID(employee?.staff_ID)
    }

    const update = async (id) => {
        try {
            const response = await axios.put(`http://127.0.0.1:4040/api/enrollment/${id}`, 
            {
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                position: position,
                grade: grade,
            },
            {
                headers: {
                    // 'application/json' is the modern content-type for JSON, but some
                    // older servers may use 'text/json'.
                    // See: http://bit.ly/text-json
                    'Content-Type': 'application/json'
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
            })
            .catch((error) => {
                if(error.response) {
                    setError(error.response.data.error)
                    setEmptyFields(error.response.data.emptyFields)
                }
            })
        } catch (error) {
            setError(error)
        }
    }

    const transfer = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:4040/api/department/transfer_employee", 
            {
                staff_ID: moveStaff_ID,
                dept_name: moveDept,
                unit_name: moveUnit
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                console.log(response)
                setSuccess(response.data.Message)
                setError(null)
                setEmptyFields([]);
                // setMoveStaff_ID('')
                // setMoveDept('')
                // setMoveUnit('')
            }).catch((error) => {
                setError(error.response.data.Message)
                setEmptyFields(error.response.data.emptyFields)
                console.log(error.response.data)
            })
        } catch (error) {
            setError(error)
        }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 
        //         staff_ID: moveStaff_ID,
        //         dept_name: moveDept,
        //         unit_name: moveUnit
        //     })
        // };
        // fetch("http://127.0.0.1:4040/api/department/transfer_employee", requestOptions)
        // .then(response => console.log(response.data.Message.json()))
        // .catch(error => console.log(error))
    }

    const unenroll = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`)
            if(response) {
                navigate("/employees")
            }
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
            {
                click && 
                (
                    <div className="transfer">
                        <span className="cancel" onClick={transferWindow}>x</span>
                        <div className="field">
                            <label >Staff ID</label>
                            <TextInput 
                                type="text"
                                value={moveStaff_ID}
                                disabled={true}
                                onChange={(e) => setMoveStaff_ID(e.target.value)}
                                className = {emptyFields?.includes("staff_ID") ? "error" : ""}
                            />
                        </div>
                        <div className="field">
                            <label >Department</label>
                            <TextInput 
                                type="text"
                                value={moveDept}
                                onChange={(e) => setMoveDept(e.target.value)}
                                className = {emptyFields?.includes("dept_name") ? "error" : ""}
                            />
                        </div>
                        <div className="field">
                            <label >Unit Name</label>
                            <TextInput 
                                type="text"
                                value={moveUnit}
                                onChange={(e) => setMoveUnit(e.target.value)}
                                className = {emptyFields?.includes("unit_name") ? "error" : ""}
                            />
                            <Button type="submit" onClick={transfer}>Submit</Button>
                        </div>
                    </div>
                )
            }
            <div className="single_employee_container">
                <div className="single_employee_update">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Department:</label>
                            <TextInput 
                                type="text"
                                placeholder = {employee?.department}
                                disabled = {true}
                            />
                        </div>
                        <div className="field">
                            <label>Unit:</label>
                            <TextInput 
                                type="text"
                                disabled = {true}
                                placeholder = {employee?.unit}
                            />
                        </div>
                        <div className="field">
                            <label>Phone Number:</label>
                            <TextInput 
                                type="text"
                                value={phone_number}
                                placeholder = {employee?.phone_number}
                                required = {true}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className = {emptyFields?.includes("phone_number") ? "error" : ""}
                            />
                        </div>
                        <div className="field">
                            <label>Position:</label>
                            <select id="" value={position} className = {emptyFields?.includes("position") ? "error" : ""} required={true} onChange={(e) => setPosition(e.target.value)}>
                                <option value="" disabled hidden>{employee?.position}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Grade:</label>
                            <select id="" value={grade} className = {emptyFields?.includes("grade") ? "error" : ""} required={true} onChange={(e) => setGrade(e.target.value)}>
                                <option value="" disabled hidden>{employee?.grade}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <Button type="submit" onClick = {() => update(employee?.employee_ID)}>Update</Button>
                            <div className="transfer_button">
                                <span className="move" onClick={transferWindow}>Transfer</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" className="uneroll" onClick={unenroll}>Unenroll</Button>
                    </div>
                    <div className="single_employee_org_info">
                        <form>
                            <div className="field">
                                <label>Staff ID:</label>
                                <input type="text" placeholder = {employee?.staff_ID} disabled/>
                            </div>
                            <div className="field">
                                <label>First Name:</label>
                                <TextInput 
                                    type="text"
                                    value={first_name}
                                    placeholder = {employee?.first_name}
                                    required = {true}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className = {emptyFields?.includes("first_name") ? "error" : ""}
                                />
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <TextInput 
                                    type="text"
                                    value={last_name}
                                    placeholder = {employee?.last_name}
                                    required = {true}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className = {emptyFields?.includes("last_name") ? "error" : ""}
                                />
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" className="email" placeholder = {employee?.email} disabled/>
                            </div>
                            <div className="field">
                                <label>Status:</label>
                                <input type="text" placeholder = {employee?.status} disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmpHero;