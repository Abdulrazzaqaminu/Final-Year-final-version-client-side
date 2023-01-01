import React from "react";
import './EnrollmentHero.css'
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import SelectField from "../../Select/SelectField";
import selectDept from "../../Select/selectDept";
import selectUnit from '../../Select/selectUnit';
import selectPosition from '../../Select/selectPosition';
import selectGrade from '../../Select/selectGrade';
import { useState } from "react";

const EnrollmentHero = () =>{
    const [staffid, setStaffid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [enrollDate, setEnrollDate] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    // department select
    const [selectedDept, setSelecedtDept] = useState();
    const onChangeDeptSelect = (e) =>{
        const selectedOption = e.target.value;
        const selectedDeptOption = selectDept.filter((d) => d.id === selectedOption)[0];
        // console.log(selectedDeptOption)
        setSelecedtDept(selectedDeptOption);
    }

    // unit select
    const [selectedUnit, setSelecedtUnit] = useState();
    const onChangeUnitSelect = (e) =>{
        const selectedOption = e.target.value;
        const selectedUnitOption = selectUnit.filter((d) => d.id === selectedOption)[0];
        // console.log(selectedUnitOption)
        setSelecedtUnit(selectedUnitOption);
    }

    // position select
    const [selectedPosition, setSelecedtPosition] = useState();
    const onChangePositionSelect = (e) =>{
        const selectedOption = e.target.value;
        const selectedPositionOption = selectPosition.filter((d) => d.id === selectedOption)[0];
        // console.log(selectedPositionOption)
        setSelecedtPosition(selectedPositionOption);
    }

    // grade select
    const [selectedGrade, setSelecedtGrade] = useState();
    const onChangeGradeSelect = (e) =>{
        const selectedOption = e.target.value;
        const selectedGradeOption = selectGrade.filter((d) => d.id === selectedOption)[0];
        // console.log(selectedGradeOption)
        setSelecedtGrade(selectedGradeOption);
    }
    return(
        <>
        <div className="enrollment-container">
            <form action="">
                <div className="field">
                    <label>Staff ID:</label>
                    <TextInput 
                        type="text"
                        value={staffid}
                        onChange={(e) => setStaffid(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field">
                    <label>First Name:</label>
                    <TextInput 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field">
                    <label>Last Name:</label>
                    <TextInput 
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field ">
                    <label>Email:</label>
                    <TextInput 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field dob">
                    <label>Date Of Birth:</label>
                    <TextInput 
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field ">
                    <label>Phone Number:</label>
                    <TextInput 
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={true}
                        maxLength={11}
                    />
                </div>
                <div className="field selectables">
                    <div className="field">    
                        <label>Dept:</label>
                        <SelectField required={true} value={selectedDept?.id} onChange={(e) => onChangeDeptSelect(e)}>
                            {
                                selectDept.map((dept) =>(
                                    <option key={dept.id} value={dept.id}>{dept.deptName}</option>
                                ))
                            }
                        </SelectField>
                    </div>

                    <div className="field">
                        <label>Unit:</label>
                        <SelectField required={true} value={selectedUnit?.id} onChange={(e) => onChangeUnitSelect(e)}>
                            {
                                selectUnit.map((unit) =>(
                                    <option key={unit.id} value={unit.id}>{unit.unitName}</option>
                                ))
                            }
                        </SelectField>
                    </div>

                    <div className="field ">
                        <label>Position:</label>
                        <SelectField required={true} value={selectedPosition?.id} onChange={(e) => onChangePositionSelect(e)}>
                            {
                                selectPosition.map((position) =>(
                                    <option key={position.id} value={position.id}>{position.position}</option>
                                ))
                            }
                        </SelectField>
                    </div>
                    <div className="field ">
                        <label>Grade:</label>
                        <SelectField required={true} value={selectedGrade?.id} onChange={(e) => onChangeGradeSelect(e)}>
                            {
                                selectGrade.map((grade) =>(
                                    <option key={grade.id} value={grade.id}>{grade.grade}</option>
                                ))
                            }
                        </SelectField>
                    </div>
                </div>
                <div className="field">
                    <label>Enrollment date:</label>
                    <TextInput 
                        type="date"
                        value={enrollDate}
                        onChange={(e) => setEnrollDate(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="field address">
                    <label>Address:</label>
                    <TextInput 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="state"
                        required={true}
                    />
                </div>
                <div className="field">
                    <br />
                {/* <label>City: </label> */}
                <TextInput 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="city"
                        required={true}
                    />
                </div>
                <div className="field">
                <TextInput 
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="street"
                        className="street"
                        required={true}
                    />
                </div>
                <br />
                <Button type="submit">Enroll</Button>
            </form>
        </div>
           
        </>
    )
}

export default EnrollmentHero;