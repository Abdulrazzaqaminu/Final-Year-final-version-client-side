import './Datatable.css'
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DataTable from 'react-data-table-component';
import { useState } from 'react';

const Employees = () => {
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
            name: "Date of Birth",
            selector: row => row.dob,
            sortable: true
        },
        {
            name: "Phone Number",
            selector: row => row.phone_number,
            sortable: true
        },
        {
            name: "Department",
            selector: row => row.department,
            sortable: true
        },
        {
            name: "Unit",
            selector: row => row.unit,
            sortable: true
        },
        {
            name: "Position",
            selector: row => row.position,
            sortable: true
        },
        {
            name: "Grade",
            selector: row => row.grade,
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
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
        },
        {
            staff_ID: "0001",
            name:   <div className="name_email">
                        <p>Abdulrazzaq <b>AMINU</b></p>
                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                    </div>,
            email: "abdulrazzaq@gmail.com",
            dob: "2002-08-08",
            phone_number: "08156259871",
            department: "Marketing and Sales",
            unit: "Procurement",
            position: 3,
            grade: 2,
            more: <Link to="/employees/:employee_id">
                    <Button>View</Button>
                </Link>,
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

export default Employees;