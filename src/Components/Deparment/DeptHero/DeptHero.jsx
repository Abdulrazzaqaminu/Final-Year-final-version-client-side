import React from "react";
import { useState } from "react";
import './DeptHero.css';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";

const DeptHero = () =>{
    const [edit_dept, setEdit_Dept] = useState("");
    const [edit_hod, setEdit_Hod] = useState("");
    const [create_dept, setCreate_Dept] = useState("");
    const [create_hod, setCreate_Hod] = useState("");
    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className="dept-container">
                <div className="dept-left">
                    <div className="dept-left-top">
                        <form action="" onSubmit={handleSubmit}>
                            <h2>Edit Department</h2>
                            <TextInput 
                                type="text"
                                placeholder="Name of dept"
                                value={edit_dept}
                                onChange={(e) => setEdit_Dept(e.target.value)}
                            />
                            <TextInput
                                type="text"
                                placeholder="Dept Head (HOD)"
                                value={edit_hod}
                                onChange={(e) => setEdit_Hod(e.target.value)}
                            />
                            <Button type="submit">Update</Button>
                        </form>
                    </div>
                    <div className="dept-left-bottom">
                        <form action="" onSubmit={handleSubmit}>
                            <h2>Create new Department</h2>
                            <TextInput 
                                type="text"
                                placeholder="Name of dept"
                                value={create_dept}
                                onChange={(e) => setCreate_Dept(e.target.value)}
                            />
                            <TextInput 
                                type="text"
                                placeholder="Name of dept"
                                value={create_hod}
                                onChange={(e) => setCreate_Hod(e.target.value)}
                            />
                            <Button type="submit">Create</Button>
                        </form>
                    </div>
                </div>
                <div className="dept-right">
                    <table>
                        <thead>
                            <h2>Departments</h2>
                            <tr>
                                <th>Department Name</th>
                                <th>Department Head</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Administration</td>
                                <td>Abdulrazzaq</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>Administration</td>
                                <td>Abdulrazzaq</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>Administration</td>
                                <td>Abdulrazzaq</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>Administration</td>
                                <td>Abdulrazzaq</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DeptHero;