import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './DeptHero.css';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";

const DeptHero = () =>{
    const [edit_dept, setEdit_Dept] = useState("");
    const [create_dept, setCreate_Dept] = useState("");
    const [create_hod, setCreate_Hod] = useState("");
    const [filter, setFilter] = useState("");
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
                                required={true}
                                onChange={(e) => setEdit_Dept(e.target.value)}
                            />
                            <Button type="submit">Update</Button>
                        </form>
                    </div>
                    <div className="dept-left-middle">
                        <form action="" onSubmit={handleSubmit}>
                            <h2>Create new Department</h2>
                            <TextInput 
                                type="text"
                                placeholder="Name of dept"
                                value={create_dept}
                                required = {true}
                                onChange={(e) => setCreate_Dept(e.target.value)}
                            />
                            <Button type="submit">Create</Button>
                        </form>
                    </div>
                    <div className="dept-left-bottom">
                        <form action="" onSubmit={handleSubmit}>
                            <TextInput 
                                type="text"
                                placeholder="Department Name"
                                value={filter}
                                disabled={true}
                                required = {true}
                                className="dept_name"
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <TextInput 
                                type="text"
                                placeholder="Employee Email"
                                value={filter}
                                required = {true}
                                className="emp_email"
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <Button type="submit" className="assign">Assign</Button>
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
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                    
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                            <tr>
                                <td>Administration</td>
                                <td>
                                    <Link className="hod" to="/department/hod/:hod_id">
                                        Abdulrazzaq Aminu
                                        <small>
                                            <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                                        </small> 
                                    </Link> 
                                </td>
                                <td><Button>HOD</Button></td>
                                <td>
                                    <Link to="/department/:departmentID/units">  
                                        <Button className="units">Units</Button>
                                    </Link>
                                </td>
                                <td><Button className="edit">Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>                                                                                                                                                           
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DeptHero;