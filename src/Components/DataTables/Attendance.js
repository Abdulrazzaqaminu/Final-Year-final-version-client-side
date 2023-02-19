import React from "react";
import './Datatable.css'
import DataTable from "react-data-table-component";


const Attendance = () =>{
    const attendanceColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.first_name +" "+row.last_name,
            sortable: true
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true
        },
        {
            name: "Entry Time",
            selector: row => row.entry_time,
            sortable: true
        },
        {
            name: "Exit Time",
            selector: row => row.exit_time,
            sortable: true
        },
    ]
    const attendanceData = [
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
        {
            staff_ID: "0001",
            first_name: "Abdulrazazq",
            last_name: "Aminu",
            date: "2023-02-19",
            entry_time: "07:12:23",
            exit_time: "15:34:02"
        },
    ]
    return(
        <>
            <DataTable
                columns={attendanceColumn}
                data={attendanceData}
                fixedHeader
                pagination
                className='datatables'
            />
        </>
    )
}

export default Attendance;