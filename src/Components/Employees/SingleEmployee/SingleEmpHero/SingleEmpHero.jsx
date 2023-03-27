import React from "react";
import { useState, useEffect } from "react";
import './SingleEmpHero.css'
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmpContext } from "../../../../hooks/useEmpContext"
import useFetch from "../../../../hooks/Fetch/useFetch";
import axios from "axios"

const SingleEmpHero = () =>{
    const location = useLocation();
    const Employee_ID = location.pathname.split("/")[2];
    const {employee, dispatch} = useEmpContext()
    const navigate = useNavigate()

    const [moveStaff_ID, setMoveStaff_ID] = useState("");
    const [moveUnit, setMoveUnit] = useState("");
    const [moveDept, setMoveDept] = useState("");
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);

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
    const {data, reFetch} = useFetch(`http://127.0.0.1:4040/api/department/filter?dept_name=${moveDept}`);

    const numberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setPhoneNumber(e.target.value);
        }
    };
    const firstNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === ""  || regex.test(e.target.value)) {
          setFirstName(e.target.value);
        }
    };
    const lastNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === ""  || regex.test(e.target.value)) {
          setLastName(e.target.value);
        }
    };
    const first_name_capitalize = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();

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

    const transferwindow = () => {
       
    }

    const handleSubmitEdit = async (e) =>{
        e.preventDefault()  
        try {            
            await axios.put(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`, 
            {
                first_name: first_name_capitalize,
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
                dispatch({type: "EDIT_EMPLOYEE", payload: response.data})
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setEmptyFields(error.response.data.emptyFields)
            })  
        } catch (error) {
            setError(error)
        }
    }

    const handleSubmitTransfer = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://127.0.0.1:4040/api/department/transfer_employee", 
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
                setClick(false)
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                setSuccess(response.data.Message)
                setError(null)
                setEmptyFields([]);
                setMoveStaff_ID('')
                setMoveDept('')
                setMoveUnit('')
                navigate("/department")
            }).catch((error) => {
                setError(error.response.data.Message)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error)
        }
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
                        <span className="cancel"><MdIcons.MdOutlineCancel
                            onClick={
                                () => {
                                    setClick(false);
                                    setError(false);
                            }}
                        /></span>
                        <form onSubmit={handleSubmitTransfer}>
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
                                <select id="" value={moveDept} /*className = {emptyFields?.includes("dept_name") ? "error" : ""}*/ className = {moveDept === "" ? "error" : ""} onChange={(e) => setMoveDept(e.target.value)}>
                                    <option value="">Choose...</option>
                                    { 
                                        data?.dept?.length > 0 ?
                                        (
                                            data?.dept?.map((dept) => (
                                                <option value = {dept.dept_name} key = {dept._id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))
                                        ) :
                                        (<option value="">No department(s)</option>)
                                    }
                                    {/* <option value="ACCOUNTING AND FINANCE">ACCOUNTING AND FINANCE</option>
                                    <option value="HUMAN RESOURCES">HUMAN RESOURCES</option>
                                    <option value="INFORMATION AND TECHNOLOGY">INFORMATION AND TECHNOLOGY</option>
                                    <option value="MARKETING AND SALES">MARKETING AND SALES</option> */}
                                </select>
                            </div>
                            
                            <div className="field">
                                <label >Unit Name</label>
                                <select id="" value={moveUnit} /*className = {emptyFields?.includes("unit_name") ? "error" : ""}*/ className = {moveUnit === "" ? "error" : ""} onChange={(e) => setMoveUnit(e.target.value)}>
                                    <option value="" disabled hidden>Choose...</option>
                                    {
                                        data?.units?.length > 0 ?
                                        (
                                            data?.units?.map((unit) => (
                                                unit?.unit.length > 0 ? 
                                                (
                                                    unit.unit?.map((unit_name) => (
                                                        <option value={unit_name.unit_name} key = {unit_name._id}>
                                                            {unit_name.unit_name}
                                                        </option>
                                                    ))
                                                ) : 
                                                (
                                                    <option value="">No units</option>
                                                )
                                            ))
                                        ) :
                                        (
                                            <option value="">Select department</option>
                                        )
                                    }
                                    {/* <option value="AUDIT">AUDIT</option>
                                    <option value="CUSTOMER SERVICE">CUSTOMER SERVICE</option>
                                    <option value="HEALTH AND SAFETY">HEALTH AND SAFETY</option>
                                    <option value="PROCUREMENT">PROCUREMENT</option>
                                    <option value="RECRUITMENT">RECRUITMENT</option> */}
                                </select>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                )
            }
            {
                edit && 
                (
                    <div className="edit">
                        <span className="cancel"> <MdIcons.MdOutlineCancel
                            onClick={
                                () => {
                                    setEdit(false);
                                    setError(false);
                            }}
                            className = "cancel_btn"
                        /></span>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="field">
                                <label >First Name</label>
                                <TextInput 
                                    type="text"
                                    value={first_name}
                                    onChange={firstNamelettersOnly}
                                    className = {first_name === "" ? "error" : ""}
                                    // className = {emptyFields?.includes("first_name") ? "error" : ""}
                                />
                            </div>
                            <div className="field">
                                <label >Last Name</label>
                                <TextInput 
                                    type="text"
                                    value={last_name}
                                    onChange={lastNamelettersOnly}
                                    className = {last_name === "" ? "error" : ""}
                                    // className = {`last_name ${emptyFields?.includes("last_name") ? "error" : ""}`}
                                />
                            </div>
                            <div className="field">
                                <label >Phone Number</label>
                                <TextInput 
                                    type="text"
                                    value={phone_number}
                                    onChange={numberOnly}
                                    maxLength={11}
                                    minLength = {11}
                                    className = {phone_number === "" ? "error" : ""}
                                    // className = {emptyFields?.includes("phone_number") ? "error" : ""}
                                />
                            </div>
                            <div className="field">
                                <label>Position:</label>
                                <select id="" value={position} /*className = {emptyFields?.includes("position") ? "error" : ""}*/ className = {position === "" ? "error" : ""} required={true} onChange={(e) => setPosition(e.target.value)}>
                                    <option value="" disabled hidden>{employee?.position}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Grade:</label>
                                <select id="" value={grade} /*className = {emptyFields?.includes("grade") ? "error" : ""}*/ className = {grade === "" ? "error" : ""} required={true} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="" disabled hidden>{employee?.grade}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <Button type="submit" >Submit</Button>
                            </div>
                        </form>
                    </div>
                )
            }
            <div className="single_employee_container">
                <div className="single_employee_update">
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
                            disabled={true}
                        />
                    </div>
                    <div className="field">
                        <label>Position:</label>
                        <select id="" value={employee?.position} disabled={true} className = {emptyFields?.includes("position") ? "error" : ""} required={true} onChange={(e) => setPosition(e.target.value)}>
                            <option value="" disabled hidden>{employee?.position}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Grade:</label>
                        <select id="" value={employee?.grade} disabled={true} className = {emptyFields?.includes("grade") ? "error" : ""} required={true} onChange={(e) => setGrade(e.target.value)}>
                            <option value="" disabled hidden>{employee?.grade}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <Button type="submit" disabled = {employee?.status == "Terminated" ? true : false} onClick = {
                            () => {
                                setEdit(true);
                                setClick(false);
                                setError(null);
                                setMoveStaff_ID("");
                                setPhoneNumber(employee?.phone_number[0]);
                                setFirstName(employee?.first_name[0]);
                                setLastName(employee?.last_name[0]);
                                setPosition(employee?.position[0]);
                                setGrade(employee?.grade[0]);
                            }
                        }>Update</Button>
                        <div className="transfer_button">
                            {
                                employee?.status == "Terminated" ? 
                                ("") :
                                (
                                    <span className="move" onClick={
                                        () =>{
                                            setClick(true);
                                            setEdit(false);
                                            setMoveStaff_ID(employee?.staff_ID);
                                            setPhoneNumber("");
                                            setFirstName("");
                                            setLastName("");
                                            setPosition("");
                                            setGrade("");
                                            setError(null);
                                        }
                                    }>Transfer</span>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="single_employee_info">
                    <div className="profile_icon">
                        <div className="icon"><MdIcons.MdAccountCircle /> </div>
                        <Button type="submit" disabled = {employee?.status == "Terminated" ? true : false} className="uneroll" onClick={unenroll}>Unenroll</Button>
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
                                    disabled={true}
                                    value={first_name_capitalize}
                                    placeholder = {employee?.first_name}
                                />
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <TextInput 
                                    type="text"
                                    value={(last_name).toUpperCase()}
                                    placeholder = {employee?.last_name}
                                    disabled={true}
                                />
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <input type="text" className="email" placeholder = {employee?.email} disabled/>
                            </div>
                            <div className="field">
                                <label>Status:</label>
                                <input type="text" className={employee?.status == "Terminated" ? "error" : employee?.status == "On Leave" ? "warning" : "green"} placeholder = {employee?.status} disabled/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmpHero;