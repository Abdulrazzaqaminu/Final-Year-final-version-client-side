import React from 'react';
import * as AiIcons from 'react-icons/ai'
import './EmployeeFilter.css';

const EmployeeFilter = ({onClick}) => {
    return (
        <>
            <div className="empFilter">
                <div className="empFilter_icon" onClick={onClick}>
                    <AiIcons.AiFillFilter /> 
                </div>
            </div>
        </>
    )
}

export default EmployeeFilter;