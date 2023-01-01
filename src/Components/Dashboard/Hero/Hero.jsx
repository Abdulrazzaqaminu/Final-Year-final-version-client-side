import React from "react";
import './Hero.css';
import Cards from "../Cards/Cards";
import DataTables from "../../DataTables/DataTables";
import Profile from "../../Profile/Profile";

const Hero = () =>{
    return(
        <>
        <main>
            <h1>Dashboard</h1>
            <div className="date_time">
                <h2 className="text-muted date">Thursday - 22nd - 2022</h2>
                <h2 className="text-muted time">5:25 pm</h2>
            </div>
            <div>
                <Cards/>
            </div>
            <div>
                <DataTables />
            </div>
            <div>
                <Profile />
            </div>
        </main>
        </>
    )
}

export default Hero;