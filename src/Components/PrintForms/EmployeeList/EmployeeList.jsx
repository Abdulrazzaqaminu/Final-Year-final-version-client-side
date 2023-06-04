import React from "react";
import "./EmployeeList.css";

function EmployeeList ({enrollDetails, componentref}) {
    return (
        <>
            <div ref={componentref} style={{display: "none"}} className="employeeListPrint">
            <h1>List of enrolled employees</h1>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Staff ID</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Name</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Email</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Date of Birth</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Phone Number</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Department</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Unit</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Position</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Grade</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Annual Gross</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Employment Type</th>
                            <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            enrollDetails?.map((empDetails) => (
                                <tr key={empDetails?.staff_ID}>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.staff_ID}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                        <p><b>{empDetails?.last_name}</b></p>
                                        <small className="text-muted">{empDetails?.first_name}</small>
                                    </td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.email}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.date_of_birth}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.phone_number}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.department}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.unit}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.position}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.grade}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{`NGN ${(empDetails?.gross_salary)?.toLocaleString()}`}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.employee_type}</td>
                                    <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empDetails?.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmployeeList;