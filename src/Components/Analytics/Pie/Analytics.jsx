import React from "react";
import "./Analytics.css";
import * as AiIcons from 'react-icons/ai';

const Analytics = ({onClick}) => {
    return (
        <>
            <div className="analyticsPie">
                <div className="analyticsPie_icon" onClick={onClick}>
                    <AiIcons.AiFillPieChart /> 
                </div>
            </div>
        </>
    )
}

export default Analytics;