import './Datatable.css'
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DataTable from 'react-data-table-component';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TextInput from '../TextInput/TextInput';
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import validator from 'validator';
import useFetch from '../../hooks/Fetch/useFetch';
import useDeptFetch from '../../hooks/Fetch/useDeptFetch';
import useEmployeeFilterFetch from '../../hooks/Fetch/useEmployeeFilterFetch';
import { useReactToPrint } from "react-to-print";
import useAttFilterFetch from "../../hooks/Fetch/useAttFilterFetch";
import useLocalGovFetch from '../../hooks/Fetch/useLocalGovFetch';
import useDeptAllFetch from '../../hooks/Fetch/useDeptAllFetch';
import useUnitAllFetch from '../../hooks/Fetch/useUnitAllFetch';
import { useEnrollContext } from "../../hooks/useEnrollContext";
import Analytics from '../Analytics/Bar/Analytics';
import EmployeeFilter from '../Analytics/EmployeeFilter/EmployeeFilter';
import Cancel from '../Analytics/Cancel';
import LineChart from '../Graphs/Line/LineChart';
import Loading from '../Loading/Loading';
import { confirmAlert } from 'react-confirm-alert'; // 
import * as AiIcons from 'react-icons/ai';
import EmployeeList from '../PrintForms/EmployeeList/EmployeeList';
import FilteredEmployee from '../PrintForms/FilteredEmployee.js/FilteredEmployee';
import csvtojson from 'csvtojson';

const Employees = () => {
    const {enroll, enrolldispatch} = useEnrollContext();
    
    const [openForm, setOpenForm] = useState(false);
    const [staffid, setStaffid] = useState("");
    const [attid, setAttid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('')
    const [dob, setDob] = useState("");
    const [department, setDepartment] = useState("");
    const [unit, setUnit] = useState("");
    const [position, setPosition] = useState("");
    const [grade, setGrade] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [enrollDate, setEnrollDate] = useState("");
    const [employee_type, setEmployee_Type] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [moreInfo, setMoreInfo] = useState(false);
    const [showEmpTable, setShowEmpTable] = useState(true);
    const [empAtt, setEmpAtt] = useState(false);
    const [employeeFilter, setEmployeeFilter] = useState(false);
    const [attendanceReport, setAttendanceReport] = useState(false);
    const [employeeFilterInput, setEmployeeFilterInput] = useState(false);

    const [popupdept, setPopupdept] = useState("");
    const [employee_id2, setEmployee_ID2] = useState("");
    const [openDate, setOpenDate] = useState(false);

    const [status, setStatus] = useState("");
    const [hour, setHour] = useState("");
    const [dayMonYea, setDayMonYea] = useState("");
    const [statePick, setStatePick] = useState("");
    const [localGovmt, setLocalGovmt] = useState("");
    const [employeeFilterSelect, setEmployeeFilterSelect] = useState('');
    const [employeeFilterValue, setEmployeeFilterValue] = useState('');

    const day = new Date();
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(day.setDate(day.getDate() + 5)),
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
    
    const from = `${from_year}-${from_month}-${from_day}`;
    const to = `${to_year}-${to_month}-${to_day}`;
    
    const first_name_capitalize = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const state_capitalize = statePick.charAt(0).toUpperCase() + statePick.slice(1).toLowerCase();
    const localGov_capitalize = localGovmt.charAt(0).toUpperCase() + localGovmt.slice(1).toLowerCase();

    const { data } = useFetch(`http://127.0.0.1:4040/api/department/filter?dept_name=${department}`);
    const { empfilter } = useEmployeeFilterFetch(`http://127.0.0.1:4040/api/enrollment/enroll/employeeFilter?filterCategory=${employeeFilterSelect}&filterInput=${employeeFilterValue}`)
    const { deptAll } = useDeptAllFetch(`http://127.0.0.1:4040/api/enrollment/enroll/employeeFilter/dept`)
    const { unitAll } = useUnitAllFetch(`http://127.0.0.1:4040/api/enrollment/enroll/employeeFilter/unit`)
    const { dept } = useDeptFetch(`http://127.0.0.1:4040/api/department/filter_department?dept_name=${popupdept}`);
    const { filter, filtererror } = useAttFilterFetch(`http://127.0.0.1:4040/api/attendance/attendance_report/filter_date?staff_ID=${attid}&from=${from}&to=${to}`);
    const { localGov } = useLocalGovFetch(`http://127.0.0.1:4040/api/localGov/getStateCities?state=${statePick}`);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true)
            try {
                await axios.get("http://127.0.0.1:4040/api/enrollment")
                .then((response) => {
                    setError(null)
                    enrolldispatch({type: "GET_EMPLOYEES", payload: response.data})
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                    enrolldispatch({type: "GET_EMPLOYEES", payload: error.response.data.result})
                })
            } catch (error) {
                setError(error)
            }
            setLoading(false);
        }
        fetchEmployees();
        const startTime = () => {
            var day = new Date();
            var time = day.getTime()
            var timeOffSet = day.getTimezoneOffset()
            var current_day = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
            setEnrollDate(current_day);
            setTimeout(startTime, 1000);
        }
        startTime();
    }, [])

    const numberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setPhoneNumber(e.target.value);
        }
    };
    const Staff_IDnumberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setStaffid(e.target.value);
        }
    };
    const AttStaff_IDnumberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setAttid(e.target.value);
        }
    };
    const firstNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setFirstName(e.target.value);
        }
    };
    const lastNamelettersOnly = (e) => {
        const regex = /^[a-zA-Z'\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setLastName(e.target.value);
        }
    };
    const validateEmail = (e) => {
        var email = e.target.value
        const regex = /^[a-zA-Z0-9\b._@]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEmail(e.target.value);
            if(!email){
                setEmailError('Required')
            }
            else if (validator.isEmail(email)) {
              setEmailError('')
            } else {
              setEmailError('Enter valid Email!')
            }
        }
    }

    const handleSubmit = async () => {
        try {
            await axios.post("http://127.0.0.1:4040/api/enrollment", 
                {
                    staff_ID: staffid, first_name: first_name_capitalize, last_name: lastName, email: email, 
                    date_of_birth: dob, phone_number: phoneNumber, department: department, unit: unit, 
                    position: position, grade: grade, enrollment_date: enrollDate, employee_type: employee_type, 
                    state_of_origin: state_capitalize,
                    localGov: localGov_capitalize,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                setShow(true)
                setOpenForm(false)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setError(null);
                enrolldispatch({type: "ENROLL_EMPLOYEE", payload: response.data})
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
        }
    }
    const confirmSubmit = (e) => {
        e.preventDefault()
        confirmAlert({
            title: 'Confirm to submit',
            message: `Enroll employee with staff ID ${staffid === "" ? "N/A" :  staffid}?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => handleSubmit()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }

    const employeeColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            width: "100px",
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            width: "200px"
        },
        {
            name: "Date of Birth",
            selector: row => row.dob,
        },
        {
            name: "Phone Number",
            selector: row => row.phone_number,
            width: "140px"
        },
        {
            name: "Department",
            selector: row => row.department,
            width: "180px"
        },
        {
            name: "Unit",
            selector: row => row.unit,
            width: "150px"
        },
        {
            name: "Position",
            selector: row => row.position,
            width: "96px",
        },
        {
            name: "Grade",
            selector: row => row.grade,
            width: "86px",
        },
        {
            name: "Annual Gross",
            selector: row => row.gross,
            width: "129px",
        },
        {
            name: "Employment Type",
            selector: row => row.employment_type,
        },
        {
            name: "Status",
            selector: row => row.status,
            width: "129px"
        },
        {
            name: "More",
            selector: row => row.more,
        },
    ]

    const employeeFilterColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            width: "100px",
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            width: "200px"
        },
        {
            name: "Date of Birth",
            selector: row => row.dob,
        },
        {
            name: "Phone Number",
            selector: row => row.phone_number,
            width: "140px"
        },
        {
            name: "Department",
            selector: row => row.department,
            width: "180px"
        },
        {
            name: "Unit",
            selector: row => row.unit,
            width: "150px"
        },
        {
            name: "Position",
            selector: row => row.position,
            width: "96px",
        },
        {
            name: "Grade",
            selector: row => row.grade,
            width: "86px",
        },
        {
            name: "Annual Gross",
            selector: row => row.gross,
            width: "129px",
        },
        {
            name: "Employment Type",
            selector: row => row.employment_type,
        },
        {
            name: "Status",
            selector: row => row.status,
            width: "129px"
        },
    ]

    const moreInfoColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            width: "100px",
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "150px"
        },
        {
            name: "Unit",
            selector: row => row.unit,
        },
        {
            name: "Employment Type",
            selector: row => row.employment_type,
        },
    ]

    const filterColumn = [
        {
            name: "Staff ID",
            selector: row => row.staff_ID,
            width: "100px",
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            width: "170px"
        },
        {
            name: "Date",
            selector: row => row.date,
            width: "125px"
        },
        {
            name: "Entry Time",
            selector: row => row.entry_time,
            width: "125px"
        },
        {
            name: "Exit Time",
            selector: row => row.exit_time,
        },
    ]

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Enrolled employees`,
        onAfterPrint: () => alert("Ok")
    })
    const componentRef2 = useRef();
    const handlePrint2 = useReactToPrint({
        content: () => componentRef2.current,
        documentTitle: `Filtered employees`,
        onAfterPrint: () => alert("Ok")
    })

    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = async (event) => {
          const csvData = event.target.result;
          const parsedData = await csvtojson().fromString(csvData);
          setJsonData(parsedData);
        };
        
        reader.readAsText(file);
    };

    const enrollEmpCsv = async () => {
        try {
            await axios.post("http://127.0.0.1:4040/api/enrollment/csv", 
                {
                    formttedCsv: jsonData
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((response) => {
                setShow(true)
                setOpenForm(false)
                setTimeout(() => {
                    setShow(false)
                }, 2000)
                setSuccess(response.data.Message)
                setError(null);
                setJsonData(null);
                enrolldispatch({type: "ENROLL_EMPLOYEE", payload: response.data})
            }).catch((error) => {
                setJsonData(null);
                setError(error.response.data.Message)
            })
        } catch (error) {
            setError(error);
        }
    }
    if(jsonData !== null) {
        enrollEmpCsv();
    }

    return(
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
            { loading ?
                ( <Loading /> ) :
                (
                    <>
                        { showEmpTable && 
                            (
                                <>
                                    <Analytics 
                                        onClick = {
                                            () => {
                                                setOpenForm(false);
                                                setMoreInfo(false);
                                                setShowEmpTable(false);
                                                setAttendanceReport(true);
                                            }
                                        }
                                    />
                                    <EmployeeFilter 
                                        onClick={
                                            () => {
                                                setEmployeeFilter(true);
                                                setMoreInfo(false);
                                                setShowEmpTable(false);
                                                setEmpAtt(false);
                                            }
                                        }
                                    />
                                    {
                                        enroll?.length > 0 ?
                                        (
                                            <div className="printEmp" onClick={handlePrint}>
                                                <div className="printEmp_icon">
                                                    <AiIcons.AiFillPrinter />
                                                </div>
                                            </div>
                                        ) :
                                        ("")
                                    }
                                    <TextInput 
                                        type="file"
                                        accept=".csv, .xlsx, .xls"
                                        onChange={handleFileUpload}
                                    />
                                    <EmployeeList componentref={componentRef} enrollDetails={enroll}/>
                                    <div className='employee_plus'>
                                        <span className="plus" onClick={
                                            () => {
                                                setOpenForm(true);
                                                setMoreInfo(false);
                                            }
                                        }><FiIcons.FiPlus /></span>
                                    </div>
                                    { openForm &&
                                        <div className="enrollment-container">
                                            <span className="close"><MdIcons.MdOutlineCancel className='close_btn' onClick={
                                                () => {
                                                    setOpenForm(false)
                                                }
                                            }/></span>
                                            <form onSubmit={confirmSubmit}>
                                                <div className="field">
                                                    <label>Staff ID:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={staffid}
                                                        onChange={Staff_IDnumberOnly}
                                                        maxLength={4}
                                                        minLength = {4}
                                                        className = {staffid === "" ? "error" : ""}
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label>First Name:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={firstName}
                                                        onChange={firstNamelettersOnly}
                                                        className = {firstName === "" ? "error" : ""}
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label>Last Name:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={lastName}
                                                        onChange={lastNamelettersOnly}
                                                        className = {`last_name ${lastName === "" ? "error" : ""}`}
                                                    />
                                                </div>
                                                <div className="field ">
                                                    <label>Email:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={email}
                                                        onChange={validateEmail}
                                                        className = {`email ${email === "" ? "error" : ""}`}
                                                    />
                                                    <span className="email_span">
                                                        <p>{emailError}</p>
                                                    </span>
                                                </div>
                                                <div className="field dob">
                                                    <label>Date Of Birth:</label>
                                                    <TextInput 
                                                        type="date"
                                                        value={dob}
                                                        onChange={(e) => setDob(e.target.value)}
                                                        className = {dob === "" ? "error" : ""}
                                                    />
                                                </div>
                                                <div className="field ">
                                                    <label>Phone Number:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={phoneNumber}
                                                        onChange={numberOnly}
                                                        maxLength={11}
                                                        minLength = {11}
                                                        className = {phoneNumber === "" ? "error" : ""}
                                                    />
                                                </div>
                                                <div className="field selectables">
                                                    <div className="field">    
                                                        <label>Department:</label>
                                                        <select id="" value={department} /*</div>className = {emptyFields?.includes("department") ? "error" : ""}*/ className = {department === "" ? "error" : ""} onChange={(e) => setDepartment(e.target.value)}>
                                                            <option value="" /*disabled hidden*/>Choose...</option>
                                                            { 
                                                                data?.dept?.length > 0 ?
                                                                (
                                                                    data?.dept?.map((dept) => (
                                                                        <option value = {dept.dept_name} key = {dept._id}>
                                                                            {dept.dept_name}
                                                                        </option>
                                                                    ))
                                                                ) :
                                                                (<option value="">No department(s)</option>)
                                                            }
                                                        </select>
                                                    </div>
            
                                                    <div className="field">
                                                        <label>Unit:</label>
                                                        <select id="" value={unit} /*className = {emptyFields?.includes("unit") ? "error" : ""}*/ className = {unit === "" ? "error" : ""} onChange={(e) => setUnit(e.target.value)}>
                                                            <option value="" disabled hidden>Choose...</option>
                                                            {
                                                                data?.units?.length > 0 ?
                                                                (
                                                                    data?.units?.map((unit) => (
                                                                        unit?.unit.length > 0 ? 
                                                                        (
                                                                            unit.unit?.map((unit_name) => (
                                                                                <option value={unit_name.unit_name} key = {unit_name._id}>
                                                                                    {unit_name.unit_name}
                                                                                </option>
                                                                            ))
                                                                        ) : 
                                                                        (
                                                                            <option value="">No units</option>
                                                                        )
                                                                    ))
                                                                ) :
                                                                (
                                                                    <option value="">Select department</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
            
                                                    <div className="field ">
                                                        <label>Position:</label>
                                                        <select id="" value={position} /*className = {emptyFields?.includes("position") ? "error" : ""}*/ className = {position === "" ? "error" : ""} onChange={(e) => setPosition(e.target.value)}>
                                                            <option value="" disabled hidden>Choose...</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                    <div className="field ">
                                                        <label>Grade:</label>
                                                        <select id="" value={grade} /*className = {emptyFields?.includes("grade") ? "error" : ""}*/ className = {grade === "" ? "error" : ""} onChange={(e) => setGrade(e.target.value)}>
                                                            <option value="" disabled hidden>Choose...</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label>Enrollment date:</label>
                                                    <TextInput 
                                                        type="text"
                                                        value={enrollDate}
                                                        disabled={true}
                                                        className = {emptyFields?.includes("enrollment_date") ? "error" : ""}
                                                    />
                                                </div>
                                                <div className="field address">
                                                    <label>Employment Type:</label>
                                                    <select id="" value={employee_type} /*className = {emptyFields?.includes("employee_type") ? "error" : ""}*/ className = {employee_type === "" ? "error" : ""} onChange={(e) => setEmployee_Type(e.target.value)}>
                                                        <option value="" disabled hidden>Choose...</option>
                                                        <option value="Full-Time">Full-Time</option>
                                                        <option value="Contracted">Contracted</option>
                                                    </select>
                                                </div>
                                                <div className="field address">
                                                    <label>Address:</label>
                                                    <select value={statePick} onChange={(e) => setStatePick(e.target.value)} className={`state ${statePick === "" ? "error" : ""}`}>
                                                        <option value="">Choose state...</option>
                                                        {
                                                            localGov?.Local_gov.length > 0 ?
                                                            (
                                                                localGov?.Local_gov?.map((state) => (
                                                                    <option value={state.state} key={state._id}>
                                                                        {state.state}
                                                                    </option>
                                                                ))
                                                            ) :
                                                            (<option value="">No States</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    <select value={localGovmt} onChange={(e) => setLocalGovmt(e.target.value)} className={`city ${localGov?.Local_gov.length > 1 ? "error" : ""}`}>
                                                        <option value="">Choose City...</option>
                                                        {
                                                            localGov?.Local_gov.length <= 1 ?
                                                            (
                                                                localGov?.Local_gov?.map((localGov) => (
                                                                    localGov.localGov?.map((localGov) => (
                                                                        <option value={localGov} key={localGov}>
                                                                            {localGov}
                                                                        </option>
                                                                    ))
                                                                ))
                                                            ) :
                                                            (<option value="" >Select State</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <br />
                                                <Button type="submit">Enroll</Button>
                                            </form>
                                        </div> 
                                    }
                                    <div className='employee_table'>
                                        <DataTable
                                            columns={employeeColumn}
                                            data={
                                                enroll?.map(employee => (
                                                    {
                                                        staff_ID: employee.staff_ID,
                                                        name: <div className="name_email">
                                                                <p><b>{employee.last_name}</b></p>
                                                                <small className="text-muted">{employee.first_name}</small>
                                                            </div>,
                                                        email: employee.email,
                                                        dob: employee.date_of_birth,
                                                        phone_number: employee.phone_number,
                                                        department: employee.status === "Terminated" ?
                                                                        <>{employee.department}</>:
                                                                        <>
                                                                            <p className='hover'
                                                                                onClick={() => {
                                                                                    // setLoading(true);
                                                                                    setMoreInfo(true);
                                                                                    setOpenForm(false);
                                
                                                                                    setPopupdept(employee.department);
                                                                                    setEmployee_ID2(employee._id);
                                                                                }}
                                                                                >{employee.department}
                                                                            </p>
                                                                        </>,
                                                        unit: employee.unit,
                                                        position: employee.position,
                                                        grade: employee.grade,
                                                        gross: <p
                                                                    onClick={() => {
                                                                        setOpenForm(false);
                                                                        setMoreInfo(false);
                                                                    }}
                                                                >{`NGN ${(employee.gross_salary)?.toLocaleString()}`}</p>,
                                                        employment_type: employee.employee_type,
                                                        status: <span className={employee.status === "Active" ? "green" : employee.status === "On Leave" ? "warning" : "red"}>{employee.status}</span>,
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
                                    </div>
                                    { moreInfo &&
                                        <div className='moreInfo'>
                                            <span className="close"><MdIcons.MdOutlineCancel className='close_btn' 
                                                onClick={() => {
                                                    setMoreInfo(false);

                                                    setOpenForm(false);
                                                }}
                                            /></span>
                                            <div className='dept_table'>
                                                <DataTable
                                                    columns={moreInfo ? moreInfoColumn : null}
                                                    data = {
                                                        moreInfo ? 
                                                        (
                                                            dept?.employees?.map((info) => (
                                                            {
                                                                    staff_ID: <p className = {employee_id2 === info._id ? "green" : ""}>{info.staff_ID}</p>,
                                                                    name: <div className="name_email">
                                                                            <p><b>{info.last_name}</b></p>
                                                                            <small className="text-muted">{info.first_name}</small>
                                                                        </div>,
                                                                    unit: info.unit,
                                                                    employment_type: info.employee_type
            
                                                            }
                                                            ))
                                                        ) :
                                                        ("")
                                                    }
                                                    title = {<p className='title'>{dept?.departments?.dept_name}: {dept?.employees?.length}</p>}
                                                    fixedHeader
                                                    pagination
                                                    className = "datatables"
                                                />
                                            </div>
                                        </div> 
                                    }
                                </>   
                            )
                        }

                        { attendanceReport &&
                            <>
                                {filtererror &&
                                    (
                                        <div className='filter_error'>
                                            <div className="error_message">
                                                {filtererror}
                                            </div>
                                        </div>
                                    )
                                }
                                <Cancel 
                                    onClick={() => {
                                        setShowEmpTable(true);
                                        setEmpAtt(false);
                                        setAttendanceReport(false);
                                        setEmployeeFilter(false);
                                    }}
                                />
                                <div className="date_range">
                                    <p><small>*Optional</small></p>
                                    <TextInput
                                        type = "text"
                                        value = {attid}
                                        className = "staff_id"
                                        placeholder = "Staff ID"
                                        maxLength={4}
                                        minLength = {4}
                                        onChange = {AttStaff_IDnumberOnly}
                                    />
                                    <span
                                        onClick={() => setOpenDate(!openDate)}
                                        className="dates"
                                    >
                                        {`${format(date[0].startDate, "yyyy-MM-dd")} - ${format(
                                            date[0].endDate,
                                            "yyyy-MM-dd"
                                        )}`}
                                    </span>
                                    {openDate && (
                                        <div>
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={(item) => setDate([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={date}
                                                className="range"
                                            />
                                        </div>
                                    )}
                                </div>
                                <LineChart 
                                    onClick = {(point, event) => {
                                        setDayMonYea(point.data.xFormatted);
                                        setStatus(point.serieId);
                                        setHour(point.data.yFormatted);
                                        setEmpAtt(true)
                                    }}
                                    from = {from}
                                />
                                { empAtt &&
                                    <div className='emp_att'>
                                        <span className="close"><MdIcons.MdOutlineCancel className='close_btn' 
                                            onClick={() => {
                                                setEmpAtt(false);
                                            }}
                                        /></span>
                                        <div className='filtertable'>
                                            <DataTable
                                                columns = {filterColumn}
                                                data = {filter?.length > 0 ? 
                                                    (
                                                        status === "Checked Out" ? 
                                                        (
                                                            filter?.filter((each) => (
                                                                each.in_time === status && each.date === dayMonYea && (each.out_time).slice(0,2) === (hour).slice(0,2)
                                                            ))?.map((info) => (
                                                                {
                                                                    staff_ID: info.staff_ID,
                                                                    name: <>
                                                                            <b>{info.last_name}</b>
                                                                                <small>
                                                                                    <p className="text-muted">{info.first_name}</p>
                                                                                </small> 
                                                                        </> ,
                                                                    email: info.email,
                                                                    date: info.date,
                                                                    entry_time: info.in_time === "Checked Out" ? 
                                                                                (<p className="red">{info.in_time}</p>) :
                                                                                (<p>{info.in_time}</p>),
                                                                    exit_time: info.out_time === "Still In" ? 
                                                                                (<p className="green">{info.out_time}</p>) :
                                                                                (<p>{info.out_time}</p>)
                                                                }
                                                            ))
                                                        ) :
                                                        (
                                                            (filter?.filter((each) => (
                                                                each.out_time === status && each.date === dayMonYea && (each.in_time).slice(0,2) === (hour).slice(0,2)
                                                            )))?.map((info) => (
                                                                {
                                                                    staff_ID: info.staff_ID,
                                                                    name: <>
                                                                            <b>{info.last_name}</b>
                                                                                <small>
                                                                                    <p className="text-muted">{info.first_name}</p>
                                                                                </small> 
                                                                        </> ,
                                                                    email: info.email,
                                                                    date: info.date,
                                                                    entry_time: info.in_time === "Checked Out" ? 
                                                                                (<p className="red">{info.in_time}</p>) :
                                                                                (<p>{info.in_time}</p>),
                                                                    exit_time: info.out_time === "Still In" ? 
                                                                                (<p className="green">{info.out_time}</p>) :
                                                                                (<p>{info.out_time}</p>)
                                                                }
                                                            ))
                                                        )
                                                    ) :
                                                    ("")
                                                }
                                                fixedHeader
                                                pagination
                                                className='datatables'
                                            />
                                        </div>
                                    </div>
                                }
                            </>
                        }

                        { employeeFilter &&
                            <>
                                <Cancel 
                                    onClick={() => {
                                        setShowEmpTable(true);
                                        setEmpAtt(false);
                                        setEmployeeFilter(false)
                                        setAttendanceReport(false);
                                        setEmployeeFilterSelect('');
                                        setEmployeeFilterValue('');
                                        setEmployeeFilterInput('');
                                    }}
                                />
                                { empfilter?.length > 0 ?
                                    <div className="printemployeeFilter" onClick={handlePrint2}>
                                        <div className="printemployeeFilter_icon">
                                            <AiIcons.AiFillPrinter />
                                        </div>
                                    </div> : 
                                    ''
                                }
                                <FilteredEmployee enrollDetails={empfilter} componentref={componentRef2}/>
                                <div className='employeeFilterMainContainer'>
                                    <select className="employeeFilterSelect" value={employeeFilterSelect} onChange={(e) => setEmployeeFilterSelect(e.target.value)} onClick={() => setEmployeeFilterInput(true)}>
                                        <option value="">Filter Category  ...</option>
                                        <option value="Status">Status</option>
                                        <option value="Department">Department</option>
                                        <option value="Unit">Unit</option>
                                        <option value="Position">Position</option>
                                        <option value="Grade">Grade</option>
                                        <option value="Employment Type">Employment Type</option>
                                    </select>
                                    { employeeFilterInput &&
                                        <>
                                            <select className='employeeFilterInput' value={employeeFilterValue} onChange={(e) => setEmployeeFilterValue(e.target.value)}>
                                                { employeeFilterSelect === 'Status' ?
                                                    <>
                                                        <option vlaue=''>Choose Status...</option>
                                                        <option value='Active'>Active</option>
                                                        <option value='On Leave'>On Leave</option>
                                                        <option value='Terminated'>Terminated</option>
                                                    </> :
                                                    employeeFilterSelect === 'Department' ?
                                                    <>
                                                        <option vlaue=''>Choose Department...</option>
                                                        { 
                                                            deptAll.length > 0 ?
                                                            (
                                                                deptAll?.map((dept) => (
                                                                    <option key={dept?.dept?._id} value={dept?.dept_name}>{dept?.dept_name}</option>
                                                                ))
                                                            ) :
                                                            <option>No Departments</option>
                                                        }
                                                    </> :
                                                    employeeFilterSelect === 'Unit' ?
                                                    <>
                                                        <option vlaue=''>Choose Unit...</option>
                                                        { 
                                                            unitAll?.map((unit) => (
                                                                unit?.unit?.length > 0 ?
                                                                (
                                                                    unit?.unit?.map((unitName) => (
                                                                        <option key={unitName?.unit_name} value={unitName?.unit_name}>{unitName?.unit_name}</option>
                                                                    ))
                                                                ) :
                                                                <option>No units</option>
                                                            ))
                                                        }
                                                    </> :
                                                    employeeFilterSelect === 'Position' ?
                                                    <>
                                                        <option vlaue=''>Choose Position...</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                    </> :
                                                    employeeFilterSelect === 'Grade' ? 
                                                    <>
                                                        <option vlaue=''>Choose Grade...</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                    </> :
                                                    employeeFilterSelect === 'Employment Type' ?
                                                    <>
                                                        <option vlaue=''>Choose Employment Type...</option>
                                                        <option value='Full-Time'>Full-Time</option>
                                                        <option value='Contracted'>Contracted</option>
                                                    </> :
                                                    ''
                                                }
                                            </select>
                                            <span onClick={() => {
                                                        setEmployeeFilterInput(false);
                                                        setEmployeeFilterSelect('');
                                                        setEmployeeFilterInput('');
                                                    }
                                            }>
                                                <MdIcons.MdOutlineCancel className="employeeFilterInput_close" />
                                            </span>
                                        </>
                                    }
                                    
                                    <div className='employeeFilterTable'>
                                        <DataTable 
                                            columns={employeeFilterColumn}
                                            data={
                                                empfilter.length > 0 ?
                                                (
                                                    empfilter?.map((empDetails) => (
                                                        {
                                                            staff_ID: empDetails.staff_ID,
                                                            name: <div className="name_email">
                                                                    <p><b>{empDetails.last_name}</b></p>
                                                                    <small className="text-muted">{empDetails.first_name}</small>
                                                                </div>,
                                                            email: empDetails.email,
                                                            dob: empDetails.date_of_birth,
                                                            phone_number: empDetails.phone_number,
                                                            department: empDetails.department,
                                                            unit: empDetails.unit,
                                                            position: empDetails.position,
                                                            grade: empDetails.grade,
                                                            gross: <p>{`NGN ${(empDetails.gross_salary)?.toLocaleString()}`}</p>,
                                                            employment_type: empDetails.employee_type,
                                                            status: <span className={empDetails.status === "Active" ? "green" : empDetails.status === "On Leave" ? "warning" : "red"}>{empDetails.status}</span>,
                                                        }
                                                    ))
                                                ) :''
                                            }
                                            fixedHeader
                                            pagination
                                            className='datatables'
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </>
                )

            }
        </>
    )
}

export default Employees;