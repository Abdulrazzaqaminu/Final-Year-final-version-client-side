import React from 'react';
import "./LeaveFilteredList.css";

function LeaveFilteredList({leaveDetails, componentref}) {
  return (
    <div ref={componentref} style={{display: "none"}} className="LeaveFilteredListPrint">
        <h1>List of filtered employee's leave status</h1>
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Staff ID</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Name</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Email</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Leave Type</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Approval Date</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Start - End</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Duration</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Paid</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    leaveDetails?.map((empLeave) => (
                        <tr key={empLeave?.staff_ID}>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.staff_ID}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                <p><b>{empLeave?.last_name}</b></p>
                                <small className="text-muted">{empLeave?.first_name}</small>
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.email}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.leave_type}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.approval_date}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.leave_duration?.start} - {empLeave?.leave_duration?.end}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.days_on_leave} {empLeave?.days_on_leave === 1 ? "day" : "days"}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.paid === true ? "Yes" : "No"}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLeave?.status}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default LeaveFilteredList