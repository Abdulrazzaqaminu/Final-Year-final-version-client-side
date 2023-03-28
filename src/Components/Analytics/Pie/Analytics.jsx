import React from "react";
import "./Analytics.css";
import * as AiIcons from 'react-icons/ai';

const Analytics = ({onClick}) => {
    return (
        <>
            <div className="analytics">
                <div className="analytics_icon" onClick={onClick}>
                    <AiIcons.AiFillPieChart /> 
                </div>
            </div>
        </>
    )
}

export default Analytics;