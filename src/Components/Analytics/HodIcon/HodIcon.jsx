import React from 'react';
import * as SlIcons from 'react-icons/sl';
import "./HodIcon.css"

const HodIcon = ({onClick}) => {
  return (
    <>
        <div className="Hodanalytics">
            <div className="Hodanalytics_icon" onClick={onClick}>
                <SlIcons.SlPeople /> 
            </div>
        </div>
    </>
  )
}

export default HodIcon