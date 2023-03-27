import React from "react";
import './RecordHero.css';
import TextInput from "../../../TextInput/TextInput";
import Button from '../../../Button/Button';
import Html5Qrcode from './Html5Qrcode';
// import ResultContainer from './ResultContainer';
import * as ImIcons from 'react-icons/im';
import { useState } from "react";
import axios from "axios"

const RecordHero = (props) =>{

    const [staffid, setStaffid] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [button, setButton] = useState(false);
    const [time, setTime] = useState("")
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [show, setShow] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])

    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        setDecodedResults(prev => [...prev, decodedResult]);
    };

    const Staff_IDnumberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setStaffid(e.target.value);
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

    // QR scanner 
    // const qrRef = React.forwardRef()

    const startTime = () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        // h = h % 12;
        // h = h ? h : 12; // the hour '0' should be '12'
        m = m < 10 ? '0'+m : m;
        h = h < 10 ? '0'+h : h;
        s = s < 10 ? '0'+s : s;
        var day = new Date();
        var time = day.getTime()
        var timeOffSet = day.getTimezoneOffset()
        var current_day = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
        setDate(current_day)
        setTime(`${h}:${m}:${s}`)
    } 
    setTimeout(startTime, 1000);

    const record = async () =>{
        try {
            await axios.post("http://127.0.0.1:4040/api/attendance/record_attendance/record", 
                {
                    staff_ID: staffid, first_name: firstname, 
                    last_name: lastname, email: email, date: date,
                    time: time
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
                }, 5000)
                setSuccess(response.data.Message)
                setStaffid("")
                setFirstName("")
                setLastName("")
                setEmail("")
                setDecodedResults([])
            }).catch((error) => {
                setError(error.response.data.Message)
                setDecodedResults([])
            })
        } catch (error) {
            setError(error);
        }
    }
    const confirm = async () => {
        try {
            await axios.post("http://127.0.0.1:4040/api/attendance/record_attendance/confirm",
            {
                email: decodedResults[0]?.decodedText
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            .then((response) => {
                setError(null)
                setEmptyFields([])
                setStaffid(response.data.employee[0].staff_ID)
                setFirstName(response.data.employee[0].first_name)
                setLastName(response.data.employee[0].last_name)
                setEmail(response.data.employee[0].email)
                setDecodedResults([])
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmptyFields(error.response.data.emptyFields)
                setDecodedResults([])
            })
        } catch (error) {
            setError(error);
        }
    }
    if(staffid && firstname && lastname && email && date && time) {
        record()
    }
    if(decodedResults.length > 0) {
        if(decodedResults[0]?.decodedText !== "") {
            confirm()
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
            <div className="record_container">
                <div className="qr_reader">
                    {/* <Button className="scan" onClick={toggleState}>{button ? <p>Close Camera</p> : <p>Scan using camera</p>}</Button> */}
                    <Html5Qrcode
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                        className="reader"
                    />
                    {/* <div className="icon"><ImIcons.ImQrcode /></div> */}
                    {/* <ResultContainer results={decodedResults} /> */}
                </div>
                <div className="recording_section">
                    <form action="">
                        <div className="field">
                            <label>Staff ID:</label>
                            <TextInput 
                                type="text"
                                value={staffid}
                                onChange={Staff_IDnumberOnly}
                                required={true}
                                maxLength={4}
                                minLength = {4}
                                disabled={true}
                                className = {emptyFields?.includes("staff_ID") ? "error" : ""}
                            />
                        </div>
                        <div className="field">
                            <label>First Name:</label>
                            <TextInput 
                                type="text"
                                value={firstname}
                                className = {`first ${emptyFields?.includes("first_name") ? "error" : ""}`}
                                onChange={firstNamelettersOnly}
                                required={true}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Last Name:</label>
                            <TextInput 
                                type="text"
                                value={lastname}
                                className = {`last ${emptyFields?.includes("last_name") ? "error" : ""}`}
                                onChange={lastNamelettersOnly}
                                required={true}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Email:</label>
                            <TextInput 
                                type="text"
                                value={email}
                                className = {`email_text ${emptyFields?.includes("email") ? "error" : ""}`}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                                disabled={true}
                            />
                        </div>
                        <div className="field">
                            <label>Date:</label>
                            <TextInput 
                                type="text"
                                value={date}
                                disabled={true}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Time:</label>
                            <TextInput 
                                type="text"
                                value={time}
                                disabled={true}
                                required={true}
                            />
                            {/* <Button type="submit">Submit</Button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RecordHero;