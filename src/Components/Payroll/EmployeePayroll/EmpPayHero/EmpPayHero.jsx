import React, { useState, useEffect } from "react";
import './EmpPayHero.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

const EmpPayHero = () =>{
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);
    const [success, setSuccess] = useState(null);

    const location = useLocation();
    const Employee_ID = location.pathname.split("/")[3];
    
    useEffect(() => {
        const fetchEmployeeSalary = async () => {
            try {
                await axios.get(`http://127.0.0.1:4040/api/payroll/employee_salary/${Employee_ID}`)
                .then((response) => {
                    setSuccess(response.data)
                    setError(null);
                    setErrorInfo(null);
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                    setErrorInfo(error.response.data.employee)
                    setError(error.response.data.Message);
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                })
            } catch (error) {
                setError(error);
            }
        }
        fetchEmployeeSalary()
    }, [])

    return (
        <>
            {error && 
            (
                <div className="error_message">
                    {error}
                </div>
            )}
            <div className="empPayroll-container">
                <form action="">
                    <div className="field">
                        <label>Staff Id</label>
                        <input type="text" disabled placeholder={success?.Staff_ID || errorInfo?.Staff_ID}/>
                    </div>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" disabled placeholder={success?.First_Name || errorInfo?.First_Name}/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" disabled placeholder={success?.Last_Name || errorInfo?.Last_Name}/>
                    </div>
                    <div className="field email">
                        <label>Email</label>
                        <input type="text" disabled placeholder={success?.Employee_Email || errorInfo?.Employee_Email}/>
                    </div>
                    <div className="field">
                        <label>Position</label>
                        <input type="text" disabled placeholder={success?.Position || errorInfo?.Position}/>
                    </div>
                    <div className="field">
                        <label>Grade</label>
                        <input type="text" disabled placeholder={success?.Grade || errorInfo?.Grade}/>
                    </div>
                    <div className="field">
                        <label>Worked Days</label>
                        <input type="text" disabled placeholder={success?.Days_Worked || errorInfo?.Days_Worked}/>
                    </div>
                        {success?.Employee_Type  === "Full-Time" || errorInfo?.Employee_Type  === "Full-Time" ? 
                           (
                            <div className="hours">
                                <div className="hours_worked">
                                    <label>Total Hours Worked</label>
                                    <input type="text" disabled placeholder={success?.Hours_Worked || errorInfo?.Hours_Worked}/>
                                </div>
                                <div className="over_time">
                                    <label>Total Extra Hours</label>
                                    <input type="text" disabled placeholder={success?.Extra_Hours || errorInfo?.Extra_Hours}/>
                                </div>
                            </div>
                           ) :
                           ( 
                            <div className="field">
                                <label>Hours Worked</label>
                                <input type="text" disabled placeholder={success?.Hours_Worked || errorInfo?.Hours_Worked}/>
                            </div>
                           )
                        }
                    <div className="field">
                        <label>Employee Type</label>
                        <input type="text" disabled placeholder={success?.Employee_Type || errorInfo?.Employee_Type}/>
                    </div>
                    <div className="field">
                        {success?.Employee_Type  === "Full-Time" || errorInfo?.Employee_Type  === "Full-Time" ? 
                            <div className="pay">
                                <div className="salary_pay">
                                    <label>Net Salary ( Per days )</label>
                                    <input type="text" disabled placeholder={success?.Net_Salary || errorInfo?.Net_Salary}/>
                                </div>
                                <div className="leave_pay">
                                    <label>Leave Pay</label>
                                    <input type="text" disabled placeholder={success?.Leave_pay || errorInfo?.Leave_pay}/>
                                </div>
                            </div> :
                            <div className="field">
                                <label>Net Salary ( Per hours )</label>
                                <input type="text" disabled placeholder={success?.Net_Salary || errorInfo?.Net_Salary}/>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default EmpPayHero;