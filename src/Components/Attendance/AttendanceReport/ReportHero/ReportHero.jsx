import React from "react";
import { useState } from "react";
import './ReportHero.css';
import TextInput from "../../../TextInput/TextInput";
import Attendnace from "../../../DataTables/Attendance";
import Button from "../../../Button/Button";

const ReportHero = () =>{
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className="report-container">
                <div className="search-by-date-time">
                    <form action="" onSubmit={handleSubmit}>
                        <TextInput 
                            type="text"
                            placeholder="From"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                        <TextInput 
                            type="text"
                            placeholder="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                        <Button type="submit">Filter</Button>
                    </form>
                </div>
                <div className="report-table">
                    <Attendnace />
                </div>
            </div>
        </>
    )
}

export default ReportHero;