import React from "react";
import "./Cancel.css";
import * as MdIcons from 'react-icons/md';

const Cancel = ({onClick}) => {
    return (
        <>
            <div className="cancel">
                <div className="cancel_icon" onClick={onClick}>
                    <MdIcons.MdCancel /> 
                </div>
            </div>
        </>
    )
}

export default Cancel;