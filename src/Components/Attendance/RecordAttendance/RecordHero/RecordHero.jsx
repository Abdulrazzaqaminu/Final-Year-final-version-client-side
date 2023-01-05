import React from "react";
import './RecordHero.css';
import TextInput from "../../../TextInput/TextInput";
import Button from '../../../Button/Button';
import { QrReader } from 'react-qr-reader';
import * as ImIcons from 'react-icons/im';
import { useState, useRef } from "react";

const RecordHero = () =>{
    const [staffid, setStaffid] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [dept, setDept] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [button, setButton] = useState(false);

    // QR scanner 
    const [qrresult, setQRresult] = useState("");
    const qrRef = useRef(null);

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }

    const toggleState = () =>{
        setButton(!button)
    }
    
    return(
        <>
            <div className="record_container">
                <div className="qr_reader">
                    <div className="qr_container">
                        {button ?
                            (<QrReader
                                onResult={(result, error) => {
                                    if (result) {
                                        setQRresult(result?.text);
                                    }

                                    if (error) {
                                        console.info(error);
                                    }
                                    }}
                                className="canvas"
                                ref={qrRef}
                                legacyMode
                            />):
                            <div className="icon"><ImIcons.ImQrcode /></div>
                        }
                        <div className="result">
                            <p>
                                { qrresult === "" ? ("No result"):(`Not Empty = ${qrresult}`)}
                            </p>
                        </div>
                        <Button className="scan" onClick={toggleState}>{button ? <p>Close Camera</p> : <p>Scan using camera</p>}</Button>
                        <form action="">
                            <div className="confirm">
                                <Button type="submit">Confirm</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="recording_section">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Staff ID:</label>
                            <TextInput 
                                type="text"
                                value={staffid}
                                onChange={(e) => setStaffid(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>First Name:</label>
                            <TextInput 
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Last Name:</label>
                            <TextInput 
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <label>Deparment:</label>
                            <TextInput 
                                type="text"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="field">
                            <div className="date_time">
                                <div className="from">
                                    <label>Date:</label>
                                    <TextInput 
                                        type="text"
                                        value={date}
                                        placeholder="2023-01-01"
                                        onChange={(e) => setDate(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <div className="to">
                                    <label>Time:</label>
                                    <TextInput 
                                        type="text"
                                        value={time}
                                        placeholder="17:06:00"
                                        onChange={(e) => setTime(e.target.value)}
                                        required={true}
                                    />
                                </div>
                                <Button type="submit">Record</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RecordHero;