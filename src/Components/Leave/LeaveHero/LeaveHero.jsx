import React from "react";
import './LeaveHero.css'
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import { useLeaveContext } from "../../../hooks/useLeaveContext";
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import axios from "axios"
import DataTable from "react-data-table-component";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import Analytics from "../../Analytics/Pie/Analytics";
import Cancel from "../../Analytics/Cancel";
import PieChart from "../../Graphs/Pie/PieChart";

const LeaveHero = () => {
    const {leave, dispatch} = useLeaveContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);

    const [approval, setApproval] = useState("");
    const [leave_type, setLeave_Type] = useState("");
    const [staff_ID, setStaff_ID] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);
    const [showLeaveTable, setShowLeaveTable] = useState(true);
    const [filterLeave, setFilterLeave] = useState(false);
    const [filterLeave_Table, setFilterLeave_Table] = useState([]);
    const [leaveStatus, setLeaveStatus] = useState("");
    const [pieResults, setPieResults] = useState({});
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
    ]);

    const Start_Date = date[0].startDate;
    const End_Date = date[0].endDate;

    const from_day = Start_Date.toLocaleString("default", {day: "2-digit"}).substr(0,2).replace('T', ' ');
    const from_month = Start_Date.toLocaleString("default", {month: "2-digit"}).substr(0,2).replace('T', ' ');
    const from_year = Start_Date.toLocaleString("default", {year: "numeric"}).substr(0,4).replace('T', ' ');

    const to_day = End_Date.toLocaleString("default", {day: "2-digit"}).substr(0,2).replace('T', ' ');
    const to_month = End_Date.toLocaleString("default", {month: "2-digit"}).substr(0,2).replace('T', ' ');
    const to_year = End_Date.toLocaleString("default", {year: "numeric"}).substr(0,4).replace('T', ' ');
    
    const start = `${from_year}-${from_month}-${from_day}`;
    const end = `${to_year}-${to_month}-${to_day}`;

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
            name: "Leave Type",
            selector: row => row.leave_type,
            sortable: true
        },
        {
            name: "Approval Date",
            selector: row => row.approval_date,
            sortable: true
        },
        {
            name: "Start - End",
            selector: row => row.start_end,
            sortable: true
        },
        {
            name: "Duration",
            selector: row => row.duration,
            sortable: true
        },
        {
            name: "Paid",
            selector: row => row.paid,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
    ]

    const filterLeaveColumn = [
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
            name: "Leave Type",
            selector: row => row.leave_type,
            sortable: true
        },
        {
            name: "Duration",
            selector: row => row.duration,
            sortable: true
        },
        {
            name: "Paid",
            selector: row => row.paid,
            sortable: true
        }
    ]

    const staff_Id_numberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setStaff_ID(e.target.value);
        }
    };

    useEffect(() => {
        const fetchLeaves = async () => {
            setLoading(true);
            try {
                await axios.get("http://127.0.0.1:4040/api/leave")
                .then((response) => {
                    setError(null)
                    dispatch({type: "GET_LEAVES", payload: response.data})
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                    dispatch({type: "GET_LEAVES", payload: error.response.data.leave})
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchLeaves();
        const startTime = () => {
            var day = new Date();
            var time = day.getTime()
            var timeOffSet = day.getTimezoneOffset()
            var current_day = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
            setApproval(current_day);
            setTimeout(startTime, 1000);
        }
        startTime();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }

    const leave_request = async () => {
        try {
            await axios.post("http://127.0.0.1:4040/api/leave",
                {                 
                    staff_ID: staff_ID,
                    leave_type: leave_type,
                    approval_date: approval,
                    duration: {
                        start: start,
                        end: end
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                dispatch({type: "REQUEST_LEAVE", payload: response.data})
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
        }
    }

    const filterLeaveType = async () => {
        try {
            await axios.get("http://127.0.0.1:4040/api/leave/filter_leave")
            .then((response) => {
                setError(null)
                setPieResults(response.data)
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
            })
            
        } catch (error) {
            setError(error);
        }
    }

    const filterLeaveTable = async (status) => {
        try {
            await axios.get(`http://127.0.0.1:4040/api/leave/filterleave_table?leave_status=${status}`)
            .then((response) => {
                setError(null)
                setFilterLeave_Table(response.data);
            })
            .catch((error) => {
                setFilterLeave_Table(error.response.data);
            })
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            {error &&
                (
                    <div className="error_message">
                        {error}
                    </div>
                )
            }
            {show ?
                (
                    <div className="success_message">
                        {success}
                    </div>
                ) :
                ("")
            }
        <div className="con">
        { showLeaveTable === true ? 
                (   
                    <div className="leave_container">
                         <Analytics 
                            onClick={() => {
                                setShowLeaveTable(false);
                                filterLeaveType();
                            }}
                        />
                        <div className="leave">
                            <span className="plus" onClick={
                                () => {
                                    setOpenRequest(true);
                                    
                                }
                            } ><FiIcons.FiPlus/></span>
                            { openRequest &&
                                <div className="leave_form">
                                    <span className="close"><MdIcons.MdOutlineCancel onClick={() => setOpenRequest(false)} className="close_icon"/></span>
                                    <form onSubmit={handleSubmit}>
                                        <div className="field">
                                            <label>Staff ID:</label>
                                            <TextInput 
                                                type="text"
                                                value={staff_ID}
                                                maxLength={4}
                                                minLength = {4}
                                                onChange={staff_Id_numberOnly}
                                                className = {staff_ID === "" ? "error" : ""}
                                                // className = {emptyFields?.includes("staff_ID") ? "error" : ""}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Leave Type:</label>
                                            <select id="" value={leave_type} onChange={(e) => setLeave_Type(e.target.value)} /*className = {emptyFields?.includes("leave_type") ? "error" : ""}*/ className = {leave_type === "" ? "error" : ""}>
                                                <option value="" disabled hidden>Choose...</option>
                                                <option value="Annual leave">Annual leave</option>
                                                <option value="Bereavement leave">Bereavement leave</option>
                                                <option value="Casual leave">Casual leave</option>
                                                <option value="Compassionate leave">Compassionate leave</option>
                                                <option value="Maternity leave">Maternity leave</option>
                                                <option value="Paternity leave">Paternity leave</option>
                                                <option value="Sabbatical leave">Sabbatical leave</option>
                                                <option value="Sick leave">Sick leave</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <label>Approval Date:</label>
                                            <TextInput 
                                                type="text"
                                                value={approval}
                                                disabled={true}
                                                className = {emptyFields?.includes("approval_date") ? "error" : ""}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Duration:</label>
                                            <div className="duration">
                                                <span
                                                    onClick={() => setOpenDate(!openDate)}
                                                    className="dates"
                                                >
                                                    {`${format(date[0].startDate, "yyyy-MM-dd")} - ${format(
                                                        date[0].endDate,
                                                        "yyyy-MM-dd"
                                                    )}`}
                                                </span>
                                            </div>
                                            <Button type="submit" onClick={leave_request}>Submit</Button>
                                        </div>
                                    </form>
                                    {openDate && (
                                        <div>
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={(item) => setDate([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={date}
                                                className="daterange"
                                            />
                                        </div>
                                    )}
                                </div> 
                            }
                            <div className="leave_table">
                                { loading ?
                                    ("Loading please wait") :
                                    (
                                        <DataTable
                                            columns={employeeColumn}
                                            data={
                                                leave?.map((leave) => (
                                                    {
                                                        staff_ID: leave?.staff_ID,
                                                        name: <div className="name_email">
                                                                <p>{leave?.first_name} <b>{leave?.last_name}</b></p>
                                                                <small className="text-muted">{leave?.email}</small>
                                                            </div>,
                                                        leave_type: leave?.leave_type,
                                                        approval_date: leave?.approval_date,
                                                        start_end: <div className="name_email">
                                                                    <p>{leave?.leave_duration.start} -</p>
                                                                    <p>{leave?.leave_duration.end}</p>
                                                                </div>,
                                                        duration: <p>{leave?.days_on_leave} {leave?.days_on_leave === 1 ? "day" : "days"}</p>,
                                                        paid: <p>{leave?.paid === true ? "Yes" : "No"}</p>,
                                                        status: <p className={leave?.status === "On Leave" ? "warning" : leave?.status === "Resumed" ? "green" : "approved"}>{leave?.status}</p>
                                                    }
                                                ))
                                            }
                                            fixedHeader
                                            pagination
                                            className='datatables'
                                        />
                                    )

                                }
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <>
                        <Cancel 
                            onClick={() => {
                                setShowLeaveTable(true);
                                setFilterLeave(false);
                                setPieResults({})
                            }}
                        />
                        <PieChart 
                            onClick = {(node, event) => {
                                // node.data
                                setOpenRequest(false)
                                setFilterLeave(true);
                                setLeaveStatus(node.data.id);
                                filterLeaveTable(node.data.id);
                            }}
                            values = {pieResults}
                        />
                    </>
                )
            }
            { filterLeave &&
                <div className="filter_leave">
                    <span className="close"><MdIcons.MdOutlineCancel className='close_btn' 
                        onClick={() => {
                            setFilterLeave(false);
                        }}
                    /></span>
                    <div className="table">
                        <DataTable
                            columns={filterLeaveColumn}
                            data={
                                filterLeave_Table?.map((leave) => (
                                    {
                                        staff_ID: leave.staff_ID,
                                        name: <div className="name_email">
                                                <p>{leave?.first_name}</p>
                                                <small className="text-muted"><b>{leave?.last_name}</b></small>
                                            </div>,
                                        leave_type: leave.leave_type,
                                        duration: <p>{leave?.days_on_leave} {leave?.days_on_leave === 1 ? "day" : "days"}</p>,
                                        paid: <p>{leave?.paid === false ? "No" : "Yes"}</p>
                                    }
                                ))
                            }
                            title ={
                                <div className="title">
                                    <p className={leaveStatus === "On Leave" ? "warning" : leaveStatus === "Resumed" ? "green" : "approved"}>{leaveStatus}</p>
                                    <p className="emp_count">: {filterLeave_Table.length}</p>
                                </div>
                            }
                            fixedHeader
                            pagination
                            className = "datatables"
                        />
                    </div>
                </div>
            }
        </div>
        </>
    )
}

export default LeaveHero;