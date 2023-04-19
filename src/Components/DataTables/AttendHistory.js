import React from "react";
import './Datatable.css'
import DataTable from "react-data-table-component";
import useFetch from "../../hooks/Fetch/useFetch";

const AttendHistory = ({from, to}) => {
    const { data } = useFetch(`http://127.0.0.1:4040/api/attendance/attendance_report?from=${from}&to=${to}`);

    const attendanceColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            sortable: true,
            width: "100px",
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            width: "140px"
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            width: "230px"
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true,
            width: "120px"
        },
        {
            name: "Entry Time",
            selector: row => row.entry_time,
            sortable: true,
            width: "120px"
        },
        {
            name: "Exit Time",
            selector: row => row.exit_time,
            sortable: true,
            width: "120px"
        },
    ]
    
    return(
        <>
            <DataTable 
                columns = {attendanceColumn}
                data = {
                    data?.map(att => (
                        {
                            staff_ID: att.staff_ID,
                            name: <>
                                    <b>{att.last_name}</b>
                                        <small>
                                            <p className="text-muted">{att.first_name}</p>
                                        </small> 
                                </> ,
                            email: att.email,
                            date: att.date,
                            entry_time: att.in_time === "Checked Out" ? 
                                        (<p className="red">{att.in_time}</p>) :
                                        (<p>{att.in_time}</p>),
                            exit_time: att.out_time === "Still In" ? 
                                        (<p className="green">{att.out_time}</p>) :
                                        (<p>{att.out_time}</p>)
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

export default AttendHistory;