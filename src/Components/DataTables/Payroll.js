import './Datatable.css'
import DataTable from 'react-data-table-component';
import useFetch from '../../hooks/Fetch/useFetch';
import * as AiIcons from 'react-icons/ai';
import PayrollList from '../PrintForms/PayrollList/PayrollList';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';


const Payroll = () => {
    const { data } = useFetch(`http://127.0.0.1:4040/api/payroll`);

    const employeeColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            sortable: true,
            width: "100px"
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "140px"
        },
        {
            name: "Email",
            selector: row => row.email,
            width: "255px"
        },
        {
            name: "Loans",
            selector: row => row.loans,
            // width: "150px"
        },
        {
            name: "Annual Gross",
            selector: row => row.annual_gross,
            width: "129px",
        },
        {
            name: "Employment Type",
            selector: row => row.employment_type,
            width: "150px"
        },
    ]

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Employees on payroll`,
        onAfterPrint: () => alert("Ok")
    })

    return(
        <>
            {
                data.length > 0 ?
                    (
                        <div className="printPayroll" onClick={handlePrint}>
                            <div className="printPayroll_icon">
                                <AiIcons.AiFillPrinter />
                            </div>
                        </div>
                    ) :
                    ("")
            }
            <PayrollList payrollDetails={data} componentref={componentRef} />
            <DataTable
                columns={employeeColumn}
                data = {
                    data?.map(payroll => (
                        {
                            staff_ID: payroll.staff_ID,
                            name: <div className="name_email">
                                    <p><b>{payroll.last_name}</b></p>
                                    <small className="text-muted">{payroll.first_name}</small>
                                </div>,
                            email: payroll.email,
                            loans: payroll.loans.length === 0 ?
                                    ("No loans") :
                                    (
                                    `NGN ${(payroll.loans).toLocaleString()}`
                                    ),
                            annual_gross: `NGN ${(payroll.annual_gross).toLocaleString()}`,
                            employment_type: payroll?.employee_type
                        }
                    ))
                }
                fixedHeader
                pagination
                className='datatables'
            />
        </>
    )
}

export default Payroll;