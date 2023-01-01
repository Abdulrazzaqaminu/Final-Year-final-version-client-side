import React from "react";
import './EmpPayHero.css';

const EmpPayHero = () =>{
    return(
        <>
            <div className="empPayroll-container">
                <form action="">
                    <div class="field">
                        <label>Staff Id</label>
                        <input type="text" disabled placeholder="<%=empInfo.staff_id %>"/>
                    </div>
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" disabled placeholder="<%=empInfo.first_name %>"/>
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" disabled placeholder="<%=empInfo.last_name %>"/>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="text" disabled placeholder="<%=empInfo.email %>"/>
                    </div>
                    <div class="field">
                        <label>Position</label>
                        <input type="text" disabled placeholder="<%=empInfo.position %>"/>
                    </div>
                    <div class="field">
                        <label>Grade</label>
                        <input type="text" disabled placeholder="<%=empInfo.grade %>"/>
                    </div>
                    <div class="field">
                        <label>Worked Days</label>
                        <input type="text" disabled placeholder="<%=number_of_days_worked %>"/>
                    </div>
                    <div class="field">
                        <label>Hours Worked</label>
                        <input type="text" disabled placeholder="<%=hours %>"/>
                    </div>
                    <div class="field">
                        <label>Tax (Per Working Days)</label>
                        <input type="text" disabled placeholder="<%='NGN '+tax_perday_formatted %>"/>
                    </div>
                    <div class="field">
                        <label>Net Salary (Per Working Days)</label>
                        <input type="text" disabled placeholder="<%='NGN '+netsalary_perday_formatted%>"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EmpPayHero;