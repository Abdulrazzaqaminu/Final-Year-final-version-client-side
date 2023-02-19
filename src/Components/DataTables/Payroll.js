import './Datatable.css'
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';

const Payroll = () => {
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
            name: "Enrollment Date",
            selector: row => row.enrollment_date,
            sortable: true
        },
        {
            name: "Loans",
            selector: row => row.loans,
            sortable: true
        },
        {
            name: "Annual Gross",
            selector: row => row.gross,
            sortable: true
        },
        {
            name: "More",
            selector: row => row.more,
            sortable: true
        },
    ]
    const employeeData = [
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            enrollment_date: "2022-12-25",
            loans: "NGN 100,00",
            gross: "NGN 2,000,000",
            more: <Link to='/payroll/employee_salary/:employee_id' className="salary">Salary</Link>
        },
    ]
    return(
        <>
            <DataTable
                columns={employeeColumn}
                data={employeeData}
                fixedHeader
                pagination
                className='datatables'
            />
        </>
    )
}

export default Payroll;