import React from 'react';
import "./PayrollList.css";

function PayrollList({payrollDetails, componentref}) {
  return (
    <div ref={componentref} style={{display: "none"}} className="payrollListPrint">
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Staff ID</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Name</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Email</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Loans</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Annual Gross</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Employment Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    payrollDetails?.map((empPayroll) => (
                        <tr key={empPayroll?.staff_ID}>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empPayroll?.staff_ID}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                <p><b>{empPayroll?.last_name}</b></p>
                                <small className="text-muted">{empPayroll?.first_name}</small>
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empPayroll?.email}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                { empPayroll?.loans?.length === 0 ?
                                    ("No loans") :
                                    (
                                    `NGN ${(empPayroll?.loans)?.toLocaleString()}`
                                    ) 
                                }
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{`NGN ${(empPayroll?.annual_gross).toLocaleString()}`}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empPayroll?.employee_type}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default PayrollList