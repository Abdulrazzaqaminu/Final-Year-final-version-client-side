import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import './ReportHero.css';
import useFetch from "../../../../hooks/Fetch/useFetch";
import AttendHistory from "../../../DataTables/AttendHistory";
import Loading from "../../../Loading/Loading";

const ReportHero = () =>{
    // const [date, setDate] = useState([]);
    const [openDate, setOpenDate] = useState(false);
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

    const { loading } = useFetch(`http://127.0.0.1:4040/api/attendance/attendance_report?from=""&to=""`);


    return(
        
        <>
            { loading ?
                ( <Loading /> ):
                (
                    <div className="report-container">
                        <div className="search-by-date-time">
                            <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText"
                            >
                                {`${format(date[0].startDate, "yyyy-MM-dd")} to ${format(
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
                                    className="daterange"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="report-table">
                            <AttendHistory
                                from = {range_from}
                                to = {range_to}
                            />
                        </div>
                    </div>
                )

            }
        </>
    )
}

export default ReportHero;