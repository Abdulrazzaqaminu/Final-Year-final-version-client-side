import React from "react";
import './PayrollHero.css';
import Payroll from "../../DataTables/Payroll";
import useFetch from "../../../hooks/Fetch/useFetch";
import Loading from "../../Loading/Loading";

const PayrollHero = () =>{
    const { loading } = useFetch(`http://127.0.0.1:4040/api/payroll`);

    return(
        <>
            { loading ?
                ( <Loading /> ):
                (
                    <div className="payroll_container">
                        <div className="Payroll-table">
                            <Payroll />
                        </div>
                    </div>
                )

            }
        </>
    )
}

export default PayrollHero;