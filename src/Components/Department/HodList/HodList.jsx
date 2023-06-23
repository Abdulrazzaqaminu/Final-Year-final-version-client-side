import React, { useRef, useState, useEffect} from "react";
import "./HodList.css";
import * as AiIcons from 'react-icons/ai';
import { useReactToPrint } from "react-to-print";
import DataTable from "react-data-table-component";
import DeptHodList from "../../PrintForms/DeptHodList/DeptHodList";
import useHodFilterFetch from "../../../hooks/Fetch/useHodFilterFetch"

const HodList = () => {
    const [hodStatus, setHodStatus] = useState("Assigned");
    const {data, error} = useHodFilterFetch(`http://127.0.0.1:4040/api/hod?hod_status=${hodStatus}`)
    const [loading, setLoading] = useState(false);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `List of HODs`,
        onAfterPrint: () => alert("Ok")
    })

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
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            width: "255px"
        },
        {
            name: "Department",
            selector: row => row.dept,
            sortable: true,
            width: "200px"
        },
        {
            name: "No. of Units",
            selector: row => row.units,
            width: "120px"
        },
        {
            name: "No. of Employees",
            selector: row => row.employees,
            width: "155px"
        },
        {
            name: hodStatus !== "Removed" ?  "Assigned On" : "Removed On",
            selector: row => row.date,
            sortable: true
        },
    ]

    return (
        <>
            {
                data?.length > 0 ?
                    (
                        <div className="printEmpdeptHodList" onClick={handlePrint}>
                            <div className="printEmpdeptHodList_icon">
                                <AiIcons.AiFillPrinter />
                            </div>
                        </div>
                    ) :
                    ("")
            }
            <select className="hodFilterDept" onChange={(e) => setHodStatus(e.target.value)}>
                <option value="">Filter by Hod status  ...</option>
                <option value="Assigned">Assigned</option>
                <option value="Removed">Removed</option>
            </select>
            <DeptHodList hodDetails={data} componentref={componentRef}/>
            <div className="deptHodList_container">
                <div className="deptHodList">
                    <DataTable 
                        columns={employeeColumn}
                        data={
                            data?.map((hodDetails) => (
                                {
                                    staff_ID: hodDetails?.staff_ID,
                                    name: <div>
                                            <p><b>{hodDetails?.hod_last_name}</b></p>
                                            <small className="text-muted">{hodDetails?.hod_first_name}</small>
                                          </div>,
                                    email: hodDetails?.hod_email,
                                    dept: hodDetails?.department?.dept_name,
                                    units: hodDetails?.no_of_units,
                                    employees: hodDetails?.no_of_employees,
                                    date: hodDetails?.assign_date || hodDetails?.remove_date
                                }
                            ))
                        }
                        fixedHeader
                        pagination
                        className='datatables'
                    />
                </div>
            </div>
        </>
    )
}

export default HodList;