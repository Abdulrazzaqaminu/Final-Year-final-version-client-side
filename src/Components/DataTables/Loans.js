import './Datatable.css'
import DataTable from 'react-data-table-component'

const Loans = () => {
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
    ]
    const employeeData = [
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            amount: "NGN 100,00",
            approval_date: "2022-12-25",
            duration: "2002-08-08 - 2002-08-08",
            desc: "Collected for Personal reasons"
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

export default Loans;