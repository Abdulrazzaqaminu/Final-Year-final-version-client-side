import React from "react";
import { useState, useEffect, useRef } from "react";
import './SingleEmpHero.css'
import TextInput from "../../../TextInput/TextInput";
import Button from "../../../Button/Button";
// import * as FiIcons from "react-icons/fi"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as MdIcons from "react-icons/md"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmpContext } from "../../../../hooks/useEmpContext"
import useFetch from "../../../../hooks/Fetch/useFetch";
import { useReactToPrint } from "react-to-print";
import axios from "axios"
import * as AiIcons from 'react-icons/ai';

const SingleEmpHero = () =>{
    const componentRef = useRef();
    const location = useLocation();
    const Employee_ID = location.pathname.split("/")[2];
    const {employee, dispatch} = useEmpContext()
    const navigate = useNavigate();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${Employee_ID}, ${employee?.employee_details?.email} profile details`,
        onAfterPrint: () => alert("Ok")
    })

    const [moveStaff_ID, setMoveStaff_ID] = useState("");
    const [moveUnit, setMoveUnit] = useState("");
    const [moveDept, setMoveDept] = useState("");
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);

    const [position, setPosition] = useState("")
    const [grade, setGrade] = useState("")
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
    // const first_name_capitalize = first_name?.charAt(0).toUpperCase() + first_name?.slice(1).toLowerCase();

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

    const handleSubmitEdit = async () =>{
        try {            
            await axios.put(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`, 
            {
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
                setEdit(false)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setError(null);
                dispatch({type: "SINGLE_EMPLOYEE", payload: response.data})
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setEmptyFields(error.response.data.emptyFields)
            })  
        } catch (error) {
            setError(error)
        }
    }
    const confirmEdit = (e) => {
        e.preventDefault()  
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Edit employee profile?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleSubmitEdit()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
          });
    }

    const handleSubmitTransfer = async () => {
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
                dispatch({type: "SINGLE_EMPLOYEE", payload: response.data})
            }).catch((error) => {
                setMoveDept('')
                setMoveUnit('')
                setError(error.response.data.Message)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error)
        }
    }
    const confirmTransfer = (e) => {
        e.preventDefault()  
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Transfer employee?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleSubmitTransfer()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }

    const unenroll = async () => {
        try {
            await axios.delete(`http://127.0.0.1:4040/api/enrollment/${Employee_ID}`)
            .then(() => {
                navigate("/employees")
            })
            .catch((error) => {
                setError(error.response.data.Message);
            })
        } catch (error) {
            setError(error);
        }
    }
    const confirmUnenroll = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Terminate employee?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => unenroll()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }

    let assign = new Date(employee?.employee_details?.hod?.assigned_date);
    let assignOptions = {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    let assignDate = assign?.toLocaleDateString("en-us", assignOptions)

    let remove = new Date(employee?.employee_details?.hod?.remove_date);
    let removeOptions = {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    let removeDate = remove?.toLocaleDateString("en-us", removeOptions)

    let profileEdit = new Date(employee?.employee_details?.updatedAt);
    let profileOption = {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    let profileEditDate = profileEdit?.toLocaleDateString("en-us", profileOption)
    let hour = profileEdit.getHours();
    let minute = profileEdit.getMinutes();
    let seconds = profileEdit.getSeconds();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? '0'+minute : minute;
    hour = hour < 10 ? '0'+hour : hour;
    seconds = seconds < 10 ? '0'+seconds : seconds;

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
                            className = "cancel_btn"
                        /></span>
                        <form onSubmit={confirmTransfer}>
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
                                <select id="" value={moveDept} className = {moveDept === "" ? "error" : ""} onChange={(e) => setMoveDept(e.target.value)}>
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
                                </select>
                            </div>
                            <div className="field">
                                <label >Unit Name</label>
                                <select id="" value={moveUnit} className = {moveUnit === "" ? "error" : ""} onChange={(e) => setMoveUnit(e.target.value)}>
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
                        <form onSubmit={confirmEdit}>
                            <div className="field">
                                <label >Phone Number</label>
                                <TextInput 
                                    type="text"
                                    value={phone_number}
                                    onChange={numberOnly}
                                    maxLength={11}
                                    minLength = {11}
                                    className = {phone_number === "" ? "error" : ""}
                                />
                            </div>
                            <div className="field">
                                <label>Position:</label>
                                <select id="" value={position} className = {position === "" ? "error" : ""} required={true} onChange={(e) => setPosition(e.target.value)}>
                                    <option value="" disabled hidden>{employee?.position}</option>
                                    <option value="">Choose...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>Grade:</label>
                                <select id="" value={grade} className = {grade === "" ? "error" : ""} required={true} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="" disabled hidden>{employee?.grade}</option>
                                    <option value="">Choose...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                )
            }

            <div className="employee-container" >
                <div className="single_employee_container">
                    <div className="profileEdit">
                        <p className="text-muted">{`Last updated: ${profileEditDate} at ${hour}:${minute}:${seconds} ${ampm}`}</p>
                    </div>
                    <div className="options">
                        { employee?.employee_details?.status === "Terminated" ?
                            (
                                <div className="print_button_hover" onClick={handlePrint}>
                                    <div className="print_button_hover_icon">
                                        <AiIcons.AiFillPrinter />
                                    </div>
                                </div>
                            ) :
                            (
                                <ul>
                                    <div className="print_button_hover" onClick={handlePrint}>
                                        <div className="print_button_hover_icon">
                                            <AiIcons.AiFillPrinter />
                                        </div>
                                    </div>
                                    <li className="edit_button_hover" onClick={() => {
                                        setEdit(true);
                                        setClick(false);
                                        setError(null);
                                        setMoveStaff_ID("");
                                        setPhoneNumber(employee?.employee_details?.phone_number);
                                        setPosition(employee?.employee_details?.position);
                                        setGrade(employee?.employee_details?.grade);
                                    }}>Edit</li>
                                    <li className="transfer_button_hover" onClick={() => {
                                        setClick(true);
                                        setEdit(false);
                                        setMoveStaff_ID(employee?.employee_details?.staff_ID);
                                        setPhoneNumber("");
                                        setPosition("");
                                        setGrade("");
                                        setError(null);
                                    }}>Transfer</li>
                                    <li className="unenroll_button_hover" onClick={confirmUnenroll}>Unenroll</li>
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
                                        <p>{employee?.employee_details?.staff_ID}</p>
                                    </div>
                                    <div className="field">
                                        <label>Name:</label>
                                        <p><b>{employee?.employee_details?.last_name} </b>{employee?.employee_details?.first_name}</p>
                                    </div>
                                    <div className="field">
                                        <label>Email:</label>
                                        <p>{employee?.employee_details?.email}</p>
                                    </div>
                                    <div className="field">
                                        <label>Date of birth:</label>
                                        <p>{employee?.employee_details?.date_of_birth}</p>
                                    </div>
                                    <div className="field">
                                        <label>Enorllment Date:</label>
                                        <p>{employee?.employee_details?.enrollment_date}</p>
                                    </div>
                                    <div className="field">
                                        <label>Department:</label>
                                        <p>{employee?.employee_details?.department}</p>
                                    </div>
                                    <div className="field">
                                        <label>Unit:</label>
                                        <p>{employee?.employee_details?.unit}</p>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="field">
                                        <label>Position:</label>
                                        <p>{employee?.employee_details?.position}</p>
                                    </div>
                                    <div className="field">
                                        <label>Grade:</label>
                                        <p>{employee?.employee_details?.grade}</p>
                                    </div>
                                    <div className="field">
                                        <label>Phone Number:</label>
                                        <p>{employee?.employee_details?.phone_number}</p>
                                    </div>
                                    <div className="field">
                                        <label>Annual Gross:</label>
                                        <p>{`NGN ${(employee?.employee_details?.gross_salary)?.toLocaleString()}`}</p>
                                    </div>
                                    <div className="field">
                                        <label>Employment Type:</label>
                                        <p>{employee?.employee_details?.employee_type}</p>
                                    </div>
                                    <div className="field">
                                        <label>Address:</label>
                                        <p>{`${employee?.employee_details?.street}, ${employee?.employee_details?.city}, ${employee?.employee_details?.state}`}</p>
                                    </div>
                                    { employee?.employee_details?.hod?.status === false ?
                                        <>
                                            { employee?.employee_details?.hod?.remove_date ?
                                                (
                                                    <div className="field">
                                                        <label>Removed as HOD:</label>
                                                        <p>{removeDate} {`(${employee?.employee_details?.hod?.dept_name})`}</p>
                                                    </div>
                                                ) :
                                                (
                                                    <div className="field">
                                                        <label>Assigned as HOD:</label>
                                                        <p>No</p>
                                                    </div>
                                                )

                                            }
                                        </> :
                                        <div className="field">
                                            <label>Assigned as HOD:</label>
                                            <p>{`${assignDate} (${employee?.employee_details?.hod?.dept_name})`}</p>
                                        </div>
                                    }
                                    <div className="field">
                                        <label>Status:</label>
                                        <p className={
                                            employee?.employee_details?.status === "Active" ? "active_status" :
                                            employee?.employee_details?.status === "Leave" ? "leave_status" :
                                            employee?.employee_details?.status === "Terminated" ? "terminated_status" : ""
                                        }>
                                            {employee?.employee_details?.status}
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bottom">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Deductions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Annual Gross</td>
                                        <td>{`NGN ${(employee?.employee_details?.gross_salary)?.toLocaleString()}`}</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Days Worked</td>
                                        <td>{employee?.days_worked}</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Worked Hours</td>
                                        <td>{employee?.hours_worked}</td>
                                        <td>-</td>
                                    </tr>
                                    {
                                        employee?.employee_details?.employee_type === "Full-Time" ?
                                        <>
                                            <tr>
                                                <td>Extra Hours</td>
                                                <td>{employee?.overtime}</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>Leave Pay</td>
                                                <td>{
                                                    employee?.employee_leave_pay === "NaN" ?
                                                    "-" :
                                                    `NGN ${employee?.employee_leave_pay}`}</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>Loan</td>
                                                <td>-</td>
                                                <td>{
                                                        employee?.loan === "NaN" ?
                                                        "-" :
                                                        `NGN ${(employee?.loan)}`
                                                    }
                                                </td>
                                            </tr>
                                        </> :
                                        ("")
                                    }
                                    
                                    <tr>
                                        <td>Net Salary (per days)</td>
                                        <td>{
                                                employee?.net === "NaN" ?
                                                "-" :
                                                `NGN ${employee?.net}`
                                            }
                                        </td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="printout_cont" ref={componentRef} style={{display: "none"}}>
                <div className="printout">
                <h1>Employee profile details</h1>
                    <div className="form_1">
                        <form>
                            <div className="field">
                                <label>Staff ID:</label>
                                <p>{employee?.employee_details?.staff_ID}</p>
                            </div>
                            <div className="field">
                                <label>First Name:</label>
                                <p>{employee?.employee_details?.first_name}</p>
                            </div>
                            <div className="field">
                                <label>Last Name:</label>
                                <p><b>{employee?.employee_details?.last_name}</b></p>
                            </div>
                            <div className="field">
                                <label>Email:</label>
                                <p>{employee?.employee_details?.email}</p>
                            </div>
                            <div className="field">
                                <label>Date of birth:</label>
                                <p>{employee?.employee_details?.date_of_birth}</p>
                            </div>
                            <div className="field">
                                <label>Enorllment Date:</label>
                                <p>{employee?.employee_details?.enrollment_date}</p>
                            </div>
                            <div className="field">
                                <label>Department:</label>
                                <p>{employee?.employee_details?.department}</p>
                            </div>
                            <div className="field">
                                <label>Unit:</label>
                                <p>{employee?.employee_details?.unit}</p>
                            </div>
                            <div className="field">
                                <label>Last updated:</label>
                                <p>{`${profileEditDate} at ${hour}:${minute}:${seconds} ${ampm}`}</p>
                            </div>
                        </form>
                    </div>
                    <div className="form_2">
                        <form>
                            <div className="field">
                                <label>Position:</label>
                                <p>{employee?.employee_details?.position}</p>
                            </div>
                            <div className="field">
                                <label>Grade:</label>
                                <p>{employee?.employee_details?.grade}</p>
                            </div>
                            <div className="field">
                                <label>Phone Number:</label>
                                <p>{employee?.employee_details?.phone_number}</p>
                            </div>
                            <div className="field">
                                <label>Annual Gross:</label>
                                <p>{`NGN ${(employee?.employee_details?.gross_salary)?.toLocaleString()}`}</p>
                            </div>
                            <div className="field">
                                <label>Employment Type:</label>
                                <p>{employee?.employee_details?.employee_type}</p>
                            </div>
                            <div className="field">
                                <label>Address:</label>
                                <p>{`${employee?.employee_details?.street}, ${employee?.employee_details?.city}, ${employee?.employee_details?.state}`}</p>
                            </div>
                            { employee?.employee_details?.hod?.status === false ?
                                <>
                                    { employee?.employee_details?.hod?.remove_date ?
                                        <>
                                            <div className="field">
                                                <label>Removed as HOD:</label>
                                                <p>{removeDate}</p>
                                            </div>
                                            <div className="field">
                                                <label></label>
                                                <p>{`(${employee?.employee_details?.hod?.dept_name})`}</p>
                                            </div>
                                        </> :
                                        (
                                            <div className="field">
                                                <label>Assigned as HOD:</label>
                                                <p>No</p>
                                            </div>
                                        )

                                    }
                                </> :
                                <>
                                    <div className="field">
                                        <label>Assigned as HOD:</label>
                                        <p>{assignDate}</p>
                                    </div>
                                    <div className="field">
                                        <label></label>
                                        <p>{`(${employee?.employee_details?.hod?.dept_name})`}</p>
                                    </div>
                                </>
                            }
                            <div className="field">
                                <label>Status:</label>
                                <p className={
                                    employee?.employee_details?.status === "Active" ? "active_status" :
                                    employee?.employee_details?.status === "Leave" ? "leave_status" :
                                    employee?.employee_details?.status === "Terminated" ? "terminated_status" : ""
                                }>
                                    {employee?.employee_details?.status}
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="desc">
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Deductions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Annual Gross</td>
                                    <td>{`NGN ${(employee?.employee_details?.gross_salary)?.toLocaleString()}`}</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Days Worked</td>
                                    <td>{employee?.days_worked}</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Worked Hours</td>
                                    <td>{employee?.hours_worked}</td>
                                    <td>-</td>
                                </tr>
                                {
                                    employee?.employee_details?.employee_type === "Full-Time" ?
                                    <>
                                        <tr>
                                            <td>Extra Hours</td>
                                            <td>{employee?.overtime}</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Leave Pay</td>
                                            <td>{
                                                employee?.employee_leave_pay === "NaN" ?
                                                "-" :
                                                `NGN ${employee?.employee_leave_pay}`}</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Loan</td>
                                            <td>-</td>
                                            <td>{
                                                    employee?.loan === "NaN" ?
                                                    "-" :
                                                    `NGN ${(employee?.loan)}`
                                                }
                                            </td>
                                        </tr>
                                    </> :
                                    ("")
                                }
                                
                                <tr>
                                    <td>Net Salary (per days)</td>
                                    <td>{
                                            employee?.net === "NaN" ?
                                            "-" :
                                            `NGN ${employee?.net}`
                                        }
                                    </td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmpHero;