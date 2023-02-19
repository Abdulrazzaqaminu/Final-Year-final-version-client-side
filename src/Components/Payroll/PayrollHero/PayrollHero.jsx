import React from "react";
import './PayrollHero.css';
import Payroll from "../../DataTables/Payroll";

const PayrollHero = () =>{
    return(
        <>
            <div className="payroll_container">
                <div className="Payroll-table">
                    <Payroll />
                </div>
            </div>
        </>
    )
}

export default PayrollHero;