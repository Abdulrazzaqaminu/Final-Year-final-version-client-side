import React from 'react';
import "./LoanList.css";

function LoanList({loanDetails, componentref}) {
  return (
    <div ref={componentref} style={{display: "none"}} className="LoanListPrint">
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Staff ID</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Name</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Email</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Amount</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Approval Date</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>From - To</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Duration</th>
                    <th style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>Loan Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    loanDetails?.map((empLoans) => (
                        <tr key={empLoans?.staff_ID}>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.staff_ID}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>
                                <p><b>{empLoans?.last_name}</b></p>
                                <small className="text-muted">{empLoans?.first_name}</small>
                            </td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.email}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.loan_amount}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.approval_date}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.loan_duration?.from} - {empLoans?.loan_duration?.to}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.amount_of_days} {empLoans?.amount_of_days === 1 ? "day" : "days"}</td>
                            <td style={{padding: "0px 10px",textAlign: "left",borderBottom:" 1px solid black"}}>{empLoans?.loan_details}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default LoanList