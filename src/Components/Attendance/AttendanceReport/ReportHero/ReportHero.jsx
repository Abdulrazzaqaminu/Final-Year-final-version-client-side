import React from "react";
import { useState } from "react";
import './ReportHero.css';
import TextInput from "../../../TextInput/TextInput";
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
                    <table>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Entry Time</th>
                                <th>Exit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                            <tr>
                                <td>0001</td>
                                <td>
                                    <div className="name_email">
                                        <p>Abdulrazzaq <b>AMINU</b></p>
                                        <small className="text-muted">abdulrazzaqaminu@gmail.com</small>
                                    </div>
                                </td>
                                <td>2022-12-25</td>
                                <td>09:00:23</td>
                                <td>17:10:53</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ReportHero;