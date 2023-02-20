import './Datatable.css'
import DataTable from 'react-data-table-component'
import useFetch from '../../hooks/useFetch'
import {Link} from 'react-router-dom';
import Button from '../Button/Button';

const Loans = () => {
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/loans`);
    console.log(data);
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
            name: "Amount",
            selector: row => row.amount,
            sortable: true
        },
        {
            name: "Approval Date",
            selector: row => row.approval_date,
            sortable: true
        },
        {
            name: "Duration",
            selector: row => row.duration,
            sortable: true
        },
        {
            name: "Loan Description",
            selector: row => row.desc,
            sortable: true
        },
        {
            name: "",
            selector: row => row.view,
            sortable: true
        },
        {
            name: "",
            selector: row => row.pay_off,
            sortable: true
        },
    ]

    return(
        <>
            { loading ? 
                ("Loading please wait") :
                (
                    <DataTable
                        columns={employeeColumn}
                        data={
                            data?.map(loan => (
                                {
                                    staff_ID: loan.staff_ID,
                                    name: <div className="name_email">
                                            <p>{loan.first_name} <b>{loan.last_name}</b></p>
                                            <small className="text-muted">{loan.email}</small>
                                        </div>,
                                    amount: `NGN ${(loan.loan_amount).toLocaleString()}`,
                                    approval_date: loan.approval_date,
                                    duration: <div className="name_email">
                                                <p>{loan.loan_duration.from} -</p>
                                                <p>{loan.loan_duration.to}</p>
                                            </div>,
                                    desc: loan.loan_details,
                                    view: <Link to={`/loans/${loan.employee_ID}`}><Button>View</Button></Link>,
                                    pay_off: <Link to={`/loans/pay_off/${loan.employee_ID}`}><Button>Pay Off</Button></Link>
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

export default Loans;