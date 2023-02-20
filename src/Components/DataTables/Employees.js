import './Datatable.css'
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const Employees = () => {
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/enrollment`);

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
            name: "Annual Gross",
            selector: row => row.gross,
            sortable: true
        },
        {
            name: "Employee Type",
            selector: row => row.employee_type,
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
            <DataTable
                columns={employeeColumn}
                data={
                    data?.map(employee => (
                        {
                            staff_ID: employee.staff_ID,
                            name: <div className="name_email">
                                    <p>{employee.first_name} <b>{employee.last_name}</b></p>
                                    <small className="text-muted">{employee.email}</small>
                                </div>,
                            dob: employee.date_of_birth,
                            phone_number: employee.phone_number,
                            department: employee.department,
                            unit: employee.unit,
                            position: employee.position,
                            grade: employee.grade,
                            gross: `NGN ${(employee.gross_salary).toLocaleString()}`,
                            employee_type: employee.employee_type,
                            more: <Link to={`/employees/${employee._id}`}>
                                    <Button>View</Button>
                                </Link>
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

export default Employees;