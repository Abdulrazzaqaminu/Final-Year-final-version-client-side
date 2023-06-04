import React from 'react';
import "./AttendanceHistoryList.css"

function AttendanceHistoryList({attHistoryDetails, componentref}) {
  return (
    <div ref={componentref} style={{display: "none"}} className="attHistoryPrint">
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Staff ID</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Name</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Email</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Date</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Entry Time</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Exit Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    attHistoryDetails?.map((empAttHistory) => (
                        <tr key={empAttHistory?.staff_ID}>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empAttHistory?.staff_ID}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                <p><b>{empAttHistory?.last_name}</b></p>
                                <small className="text-muted">{empAttHistory?.first_name}</small>
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empAttHistory?.email}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empAttHistory?.date}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empAttHistory?.in_time}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empAttHistory?.out_time}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default AttendanceHistoryList