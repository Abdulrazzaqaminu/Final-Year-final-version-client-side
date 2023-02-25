import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './DeptHero.css';
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useDepartmentContext } from "../../../hooks/useDepartmentContext";

const DeptHero = () =>{
    const {departments, dispatch} = useDepartmentContext()
    const [loading, setLoading] = useState([false])
    
    const [edit_dept, setEdit_Dept] = useState("");
    const [create_dept, setCreate_Dept] = useState("");
    const [dept_name, setDept] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:4040/api/department");
                dispatch({type: "ALL_DEPARTMENTS", payload: response.data})
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    const departmentColumn = [
        {
            name: "Department Name",
            selector: row => row.department_name,
            sortable: true
        },
        {
            name: "HOD",
            selector: row => row.hod,
            sortable: true
        },
        {
            name: "Unit",
            selector: row => row.unit,
            sortable: true
        },
        {
            name: "Edit",
            selector: row => row.edit,
            sortable: true
        },
        {
            name: "Assign HOD",
            selector: row => row.assign,
            sortable: true
        },
        {
            name: "Delete",
            selector: row => row.delete,
            sortable: true
        },
    ]

    const edit = async (Department_id) => {
        if(edit_dept === ""){
            return "Cannot edit without value"
        } else {
            try {
                const response = await axios.put(`http://127.0.0.1:4040/api/department/${Department_id}`, {
                    dept_name: edit_dept
                });
                if(response) {
                    setEdit_Dept('')
                    setError(null);
                    dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
                }
            } catch (error) {
                setError(error);
                return error
            }
        }
    }

    const del = async (Department_ID) => {
       try {
        const response = await axios.delete(`http://127.0.0.1:4040/api/department/${Department_ID}`);
        if(response) {
            setError(null);
            dispatch({type: "DELETE_DEPARTMENT", payload: response.data})
        }
       } catch (error) {
            setError(error);
            return error;
       }
    }

    const createDept = async () => {
        if(create_dept === "") {
            return "Cannot create department without value"
        } else {
            try {
                const response = await axios.post(`http://127.0.0.1:4040/api/department`, {dept_name: create_dept}, {
                    headers: {
                      // 'application/json' is the modern content-type for JSON, but some
                      // older servers may use 'text/json'.
                      // See: http://bit.ly/text-json
                      'content-type': 'application/json'
                    }
                });
                if(response) {
                    setCreate_Dept('')
                    setError(null);
                    dispatch({type: "CREATE_DEPARTMENT", payload: response.data})
                }
            } catch (error) {
                setError(error);
                return error
            }
        }
    }

    const assign = async (Hod_ID) => {
        if(email === "") {
            return "Cannot assign empty hod"
        } else {
            try {
                const response = await axios.put(`http://127.0.0.1:4040/api/hod/${Hod_ID}`, {dept_HOD_email: email}, {
                    headers: {
                      // 'application/json' is the modern content-type for JSON, but some
                      // older servers may use 'text/json'.
                      // See: http://bit.ly/text-json
                      'content-type': 'application/json'
                    }});
                if(response) {
                    setEmail('');
                    setError(null);
                    dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
                }
            } catch (error) {
                setError(error);
                return error
            }
        }
    }
    
    return(
        <>
            <div className="dept-container">
                <div className="dept-left">
                    <div className="dept-left-top">
                        <h2>Edit Department</h2>
                        <TextInput 
                            type="text"
                            placeholder="Name of dept"
                            value={edit_dept}
                            onChange={(e) => setEdit_Dept(e.target.value)}
                        />
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
                            <Button type="submit" onClick={createDept}>Create</Button>
                        </form>
                    </div>
                    <div className="dept-left-bottom">
                        <form action="" onSubmit={handleSubmit}>
                        <h2>Assign HOD</h2>
                            <TextInput 
                                type="text"
                                placeholder="Enter employee's email below"
                                disabled={true}
                                className="dept_name"
                                onChange={(e) => setDept(e.target.value)}
                            />
                            <TextInput 
                                type="text"
                                value={email}
                                required = {true}
                                className="emp_email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div className="dept-right">
                {loading ? 
                ("Loading Please wait") : 
                (   <DataTable
                        columns={departmentColumn}
                        data={departments?.map((dept, index) => (
                            {
                                department_name: dept?.dept_name,
                                hod: dept?.dept_HOD?.hod_id === "N/A" ? 
                                    (   <>
                                            {dept.dept_HOD?.hod_first_name} <b>{dept.dept_HOD?.hod_last_name}</b>
                                            <small>
                                                <p className="text-muted">{dept.dept_HOD?.hod_email}</p>
                                            </small> 
                                        </>
                                    ) :
                                    (
                                        <Link className="hod" to={`/department/hod/${dept.dept_HOD?.hod_id}`}>
                                            {dept.dept_HOD?.hod_first_name} <b>{dept.dept_HOD?.hod_last_name}</b>
                                            <small>
                                                <p className="text-muted">{dept.dept_HOD?.hod_email}</p>
                                            </small> 
                                        </Link>
                                    ),
                                unit: <Link to={`/department/${dept._id}/units`}>  
                                        <Button className="units">Units</Button>
                                    </Link>,
                                edit: <Button className="edit" onClick={() => edit(dept._id)}>Edit</Button>,
                                assign: <Button className="assign" onClick={() => assign(dept._id)}>Assign</Button>,
                                delete: <Button onClick={() => del(dept._id)}>Delete</Button>
                            }
                        ))}
                        fixedHeader
                        pagination
                        className='datatables'
                    />
                )
            }
                </div>
            </div>
        </>
    )
}

export default DeptHero;