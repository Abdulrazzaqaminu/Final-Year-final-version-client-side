import React from "react";
import "./Analytics.css";
import * as SiIcons from 'react-icons/si';

const Analytics = ({onClick}) => {
    return (
        <>
            <div className="analyticsBar">
                <div className="analyticsBar_icon" onClick={onClick}>
                    <SiIcons.SiSimpleanalytics /> 
                </div>
            </div>
        </>
    )
}

export default Analytics;