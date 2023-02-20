import './Datatable.css'
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import useFetch from '../../hooks/useFetch';

const Payroll = () => {
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/payroll`);

    const employeeColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Employee Type",
            selector: row => row.employee_type,
            sortable: true
        },
        {
            name: "Loans",
            selector: row => row.loans,
            sortable: true
        },
        {
            name: "Annual Gross",
            selector: row => row.annual_gross,
            sortable: true
        },
        {
            name: "More",
            selector: row => row.more,
            sortable: true
        },
    ]

    return(
        <>
            {loading ? 
                ("Loading please wait") : 
                (
                    <DataTable
                        columns={employeeColumn}
                        data = {
                            data?.map(payroll => (
                                {
                                    staff_ID: payroll.staff_ID,
                                    name: <div className="name_email">
                                            <p>{payroll.first_name} <b>{payroll.last_name}</b></p>
                                            <small className="text-muted">{payroll.email}</small>
                                        </div>,
                                    employee_type: payroll.employee_type,
                                    loans: payroll.loans.length === 0 ?
                                            ("No loans") :
                                            (
                                               `NGN ${(payroll.loans).toLocaleString()}`
                                            ),
                                    annual_gross: `NGN ${(payroll.annual_gross).toLocaleString()}`,
                                    more: <Link to={`/payroll/employee_salary/${payroll.employee_id}`}className="salary">Salary</Link>
                                }
                            ))
                        }
                        fixedHeader
                        pagination
                        className='datatables'
                    />
                )
            }
        </>
    )
}

export default Payroll;