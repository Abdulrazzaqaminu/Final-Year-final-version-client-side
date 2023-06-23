import React from 'react';
import './FilteredAttendanceList.css';

function FilteredAttendanceList({empFillteredListDetails, componentref}) {
  return (
    <div ref={componentref} style={{display: "none"}} className="empFillteredListDetails">
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
                    empFillteredListDetails?.map((empFillteredAtt) => (
                        <tr key={empFillteredAtt?.staff_ID}>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empFillteredAtt?.staff_ID}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                <p><b>{empFillteredAtt?.last_name}</b></p>
                                <small className="text-muted">{empFillteredAtt?.first_name}</small>
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empFillteredAtt?.email}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empFillteredAtt?.date}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empFillteredAtt?.in_time}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empFillteredAtt?.out_time}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default FilteredAttendanceList