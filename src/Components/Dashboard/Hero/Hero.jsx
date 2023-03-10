import React, { useEffect } from "react";
import './Hero.css';
import Cards from "../Cards/Cards";
import Attendance from "../../DataTables/Attendance";
import Profile from "../../Profile/Profile";
import { useState } from "react";

const Hero = () =>{
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [ampm, setAmpm] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        const startTime = () => {
            const today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let s = today.getSeconds();
            var ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12;
            h = h ? h : 12; // the hour '0' should be '12'
            m = m < 10 ? '0'+m : m;
            h = h < 10 ? '0'+h : h;
            s = s < 10 ? '0'+s : s;
            setHours(h)
            setMinutes(m)
            setSeconds(s)
            setAmpm(ampm)
            let to_day = new Date();
            let options = {
                weekday: "long", 
                day: "numeric",
                month: "long",
                year: "numeric"
            }
            let day = to_day.toLocaleDateString("en-us", options);
            setDate(day);
            setTimeout(startTime, 1000);
        }
        startTime()
    }, [])

    return(
            <main>
                <h1>Dashboard</h1>
                <div className="date_time">
                    <h2 className="text-muted date">{date}</h2>
                    <h2 className="text-muted time">{`${hours}:${minutes}:${seconds} ${ampm}`}</h2>
                </div>
                <div>
                    <Cards/>
                </div>
                <div className="attendance-table">
                    <Attendance />
                </div>
                <div>
                    <Profile />
                </div>
            </main>
    )
}

export default Hero;