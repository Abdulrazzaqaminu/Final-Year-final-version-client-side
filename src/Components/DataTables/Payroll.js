import './Datatable.css'
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import useFetch from '../../hooks/Fetch/useFetch';
import Button from '../Button/Button';

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
            sortable: true,
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            width: "200px"
        },
        {
            name: "Loans",
            selector: row => row.loans,
            sortable: true
        },
        {
            name: "Annual Gross",
            selector: row => row.annual_gross,
            sortable: true,
            width: "150px"
        },
        {
            name: "More",
            selector: row => row.more,
            sortable: true
        },
    ]

    return(
        <>
            <>
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
                                more: <Link to={`/payroll/employee_salary/${payroll.employee_id}`}><Button>Salary</Button></Link>
                            }
                        ))
                    }
                    fixedHeader
                    pagination
                    className='datatables'
                />
            </>
        </>
    )
}

export default Payroll;