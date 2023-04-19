import React from "react";
import './LoansHero.css';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import { useLoanContext } from "../../../hooks/useLoanContext"
import axios from "axios"
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import DataTable from "react-data-table-component";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import Loading from "../../Loading/Loading";


const LoansHero = () =>{
    const {loans, dispatch} = useLoanContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);

    const [assign, setAssign] = useState("");
    const [amount, setAmount] = useState("");
    const [formatAmount, setFormatAmount] = useState("")
    const [approval, setApproval] = useState("");
    const [loanDesc, setLoanDesc] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openLoan, setOpenLoan] = useState(false);
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
    
    const range_from = `${from_year}-${from_month}-${from_day}`;
    const range_to = `${to_year}-${to_month}-${to_day}`;

    const loan_desc_capitalize = loanDesc.charAt(0).toUpperCase() + loanDesc.slice(1).toLowerCase();

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
            sortable: true,
            width: "120px"
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            width: "200px"
        },
        {
            name: "Amount",
            selector: row => row.amount,
            sortable: true,
            width: "120px"
        },
        {
            name: "Approval Date",
            selector: row => row.approval_date,
            sortable: true
        },
        {
            name: "Fom - To",
            selector: row => row.from_to,
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
        // {
        //     name: "",
        //     selector: row => row.pay_off,
        //     sortable: true
        // },
    ]

    const staff_Id_numberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setAssign(e.target.value);
        }
    };
    const amount_numberOnly = (e) => {
        // .replace(/,/g, "")
        // .replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")
        const regex = /^[0-9\b,]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setAmount((e.target.value).replace(/\,/g, ''));
            setFormatAmount((e.target.value) === "" ? 0 : parseInt((e.target.value).replace(/,/g, '')).toLocaleString())
        }
    };
    const desclettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setLoanDesc(e.target.value);
        }
    };

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            try {
                await axios.get("http://127.0.0.1:4040/api/loans")
                .then((response) => {
                    setError(null)
                    dispatch({type: "GET_ALL_LOANS", payload: response.data})
                }).catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                    dispatch({type: "GET_ALL_LOANS", payload: error.response.data.loan})
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchLoans();
        const startTime = () => {
            var day = new Date();
            var time = day.getTime()
            var timeOffSet = day.getTimezoneOffset()
            var current_day = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
            setApproval(current_day);
            setTimeout(startTime, 1000);
        }
        startTime();
    }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    const loan_payment = async () => {
        try {
            await axios.post("http://127.0.0.1:4040/api/loans", 
                {
                    staff_ID: assign,
                    loan_amount: amount,
                    approval_date: approval,
                    loan_duration: {
                        from: range_from,
                        to: range_to
                    },
                    loan_details: loan_desc_capitalize
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
                dispatch({type: "LOAN_PAYMENT", payload: response.data})
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
                ( <Loading /> ):
                (
                    <div className="loans_container">
                        <div className="loan">
                            <span className="plus" onClick={
                                () => {
                                    setOpenLoan(true);
                                }
                            } ><FiIcons.FiPlus/></span>
                            { openLoan &&    
                                <div className="loan-form">
                                    <span className="close"><MdIcons.MdOutlineCancel onClick={() => setOpenLoan(false)} className="close_icon"/></span>
                                    <form onSubmit={handleSubmit}>
                                        <div className="field">
                                            <label>Assign To (Staff ID):</label>
                                            <TextInput 
                                                type="text"
                                                value={assign}
                                                onChange={staff_Id_numberOnly}
                                                maxLength={4}
                                                minLength = {4}
                                                className = {assign === "" ? "error" : ""}
                                                // className = {emptyFields?.includes("staff_ID") ? "error" : ""}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>Amount:</label>
                                            <TextInput 
                                                type="text"
                                                value={formatAmount}
                                                onChange={amount_numberOnly}
                                                className = {amount === "" ? "error" : ""}
                                                // className = {emptyFields?.includes("loan_amount") ? "error" : ""}
                                            />
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
                                        </div>
                                        <div className="field">
                                            <label>Loan Description:</label>
                                            <textarea name="" value={loanDesc} /*className = {emptyFields?.includes("loan_details") ? "error" : ""}*/ className = {loanDesc === "" ? "error" : ""} onChange={desclettersOnly} id="" cols="30" rows="2"></textarea>
                                            
                                            <Button type="submit" onClick={loan_payment}>Submit</Button>
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
                            <div className="loan-table">
                                <DataTable
                                    columns={employeeColumn}
                                    data={
                                        loans?.map((loan) => (
                                            {
                                                staff_ID: loan?.staff_ID,
                                                name: <div className="name_email">
                                                        <p><b>{loan?.last_name}</b></p>
                                                        <small className="text-muted">{loan?.first_name}</small>
                                                    </div>,
                                                email: loan?.email,
                                                amount: `NGN ${(loan?.loan_amount).toLocaleString()}`,
                                                approval_date: loan?.approval_date,
                                                from_to: <div className="name_email">
                                                            <p>{loan?.loan_duration.from} -</p>
                                                            <p>{loan?.loan_duration.to}</p>
                                                        </div>,
                                                duration: <p>{loan?.amount_of_days} {loan?.amount_of_days === 1 ? "day" : "days"}</p> ,
                                                desc: loan?.loan_details,
                                                // pay_off: <Link to={`/loans/pay_off/${loan.employee_ID}`}><Button>Pay Off</Button></Link>
                                            }
                                        ))
                                    }
                                    fixedHeader
                                    pagination
                                    className='datatables'
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LoansHero;