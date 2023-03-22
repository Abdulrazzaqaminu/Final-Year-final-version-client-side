import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import './DeptHero.css';
import TextInput from "../../TextInput/TextInput";
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import Button from "../../Button/Button";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useDepartmentContext } from "../../../hooks/useDepartmentContext";
import { useUnitContext } from '../../../hooks/useUnitContext';

const DeptHero = () =>{
    const {departments, dispatch} = useDepartmentContext();
    const {units, unitdispatch} = useUnitContext();

    const navigate = useNavigate();
    const { search } = useLocation();
    const Department_ID = new URLSearchParams(search).get("dept_id");
    const Unit_ID = new URLSearchParams(search).get("unit_id");
    const [deptID, setDeptID] = useSearchParams();
    const [unitID, setUnitID] = useSearchParams();
    const [editUnitParams, setEditUnitParams] = useSearchParams();

    const removeUnitIDParams = () => {
        const params = editUnitParams.get("unit_id");
        if(params) {
            editUnitParams.delete("unit_id");
            setEditUnitParams(editUnitParams);
        }
    }
    const removeAll = () => {
        const unit_id = unitID.get("unit_id") 
        if(unit_id) {
            unitID.delete("unit_id")
            setUnitID(unitID);
        } else {
            deptID.delete("dept_id");
            setDeptID(deptID);
        }
    }

    const [loading, setLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [open, setOpen] = useState(false);
    const [addinputs, setAddinputs] = useState([]);
    const [addUnitInputs, setAddUnitInputs] = useState([]);
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [editUnit, setEditUnit] = useState(false);

    let handleInputChange = (i, e) => {
        let newInputField = [...addinputs];
        newInputField[i][e.target.name] = e.target.value;
        const regex = /^[a-zA-Z\b\s]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setAddinputs(newInputField);
        }
    }
    let handleUnitInputChange = (i, e) => {
        let newInputField = [...addUnitInputs];
        newInputField[i][e.target.name] = e.target.value;
        const regex = /^[a-zA-Z\b\s]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setAddUnitInputs(newInputField);
        }
    }
    
    let addUnit = () => {
        setAddinputs([...addinputs, {unit_name: ""}])
    }
    let createUnit = () => {
        setAddUnitInputs([...addUnitInputs, {unit_name: ""}])
    }
    
    let removeUnit = (i) => {
        let newInputField = [...addinputs];
        newInputField.splice(i, 1);
        setAddinputs(newInputField)
    }
    let removecreateUnit = (i) => {
        let newInputField = [...addUnitInputs];
        newInputField.splice(i, 1);
        setAddUnitInputs(newInputField)
    }
    
    const [create_dept, setCreate_Dept] = useState("");
    const [email, setEmail] = useState("");
    const [edit_deptName, setEdit_DeptName] = useState("");
    const [edit_unitName, setEdit_UnitName] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false)
    const [listUnits, setListUnits] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [assign_HOD, setAssign_HOD] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                await axios.get("http://127.0.0.1:4040/api/department")
                .then((response) => {
                    setError(null)
                    dispatch({type: "ALL_DEPARTMENTS", payload: response.data})
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    dispatch({type: "ALL_DEPARTMENTS", payload: error.response.data.dept})
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchDepartments();
    },[]);

    const editlettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEdit_DeptName(e.target.value);
        }
    };
    const unitlettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEdit_UnitName(e.target.value);
        }
    };
    const deptlettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setCreate_Dept(e.target.value);
        }
    };
    const emaillettersOnly = (e) => {
        const regex = /^[a-zA-Z@.\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setEmail(e.target.value);
        }
    };

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
    const unitColumn = [
        {
            name: "Unit Name",
            selector: row => row.unit_name,
            sortable: true
        },
        {
            name: "Employees",
            selector: row => row.num_emp,
            sortable: true
        },
        {
            name: "Edit",
            selector: row => row.edit,
            sortable: true
        },
        {
            name: "Delete",
            selector: row => row.delete,
            sortable: true
        },
    ]

    const listOfUnits = async (Department_ID) => {
        try {
            await axios.get(`http://127.0.0.1:4040/api/unit/${Department_ID}`)
            .then((response) => {
                setError(null)
                unitdispatch({type: "ALL_UNITS", payload: response.data})
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                unitdispatch({type: "ALL_UNITS", payload: error.response.data})
            })
        } catch (error) {
            setError(error)
        }
    }

    const createDept = async () => {
        try {
            await axios.post(`http://127.0.0.1:4040/api/department`, {
                dept_name: create_dept,
                unit: addinputs.map((unit) => (
                    {
                        unit_name: unit.unit_name
                    }
                ))
            }, 
            {
                headers: {
                    // 'application/json' is the modern content-type for JSON, but some
                    // older servers may use 'text/json'.
                    // See: http://bit.ly/text-json
                    'content-type': 'application/json'
                }
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setCreate_Dept("")
                setAddinputs([])
                dispatch({type: "CREATE_DEPARTMENT", payload: response.data})
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
            return error
        }
    }

    const editDept = async () => {
        try {
            await axios.put(`http://127.0.0.1:4040/api/department/${Department_ID}`, {
                dept_name: edit_deptName
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setEdit_DeptName("")
                dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
        }
    }

    const assignHod = async () => {
        try {
            await axios.put(`http://127.0.0.1:4040/api/hod/${Department_ID}`, {dept_HOD_email: email}, {
                headers: {
                    // 'application/json' is the modern content-type for JSON, but some
                    // older servers may use 'text/json'.
                    // See: http://bit.ly/text-json
                    'content-type': 'application/json'
                }}).then((response) => {
                    setShow(true)
                    setTimeout(() => {
                        setShow(false)
                    }, 3000)
                    setError(null)
                    setSuccess(response.data.Message)
                    setEmptyFields([])
                    setEmail("")
                    dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
                }).catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    setEmptyFields(error.response.data.emptyFields)
                })
            // if(response) {
            //     setEmail('');
            //     setError(null);
            //     dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
            // }
        } catch (error) {
            setError(error);
            return error
        }
    }

    const del = async (Department_ID) => {
       try {
        await axios.delete(`http://127.0.0.1:4040/api/department/${Department_ID}`)
        .then((response) => {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000)
            setError(null)
            setSuccess(response.data.Message)
            dispatch({type: "DELETE_DEPARTMENT", payload: response.data})
        })
        .catch((error) => {
            setError(error.response.data.Message)
            setTimeout(() => {
                setError(null)
            }, 5000)
        })
       } catch (error) {
            setError(error);
            return error;
       }
    }

    const unitCreate = async () => {
        try {
            await axios.post(`http://127.0.0.1:4040/api/unit/${Department_ID}`, {
                unit: addUnitInputs.map((unit) => (
                    {
                        unit_name: unit.unit_name
                    }
                )) 
            }, {
                headers: {
                    // 'application/json' is the modern content-type for JSON, but some
                    // older servers may use 'text/json'.
                    // See: http://bit.ly/text-json
                    'content-type': 'application/json'
                }
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setAddUnitInputs([]);
                setError(null);
                unitdispatch({type: "CREATE_UNIT", payload: response.data})
            }).catch((error) => {
                console.log(error)
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
            return error
        }
    }

    const unitUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:4040/api/unit/${Department_ID}/${Unit_ID}`, {
                unit_name: edit_unitName
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setEdit_UnitName('')
                unitdispatch({type: "EDIT_UNITS", payload: response.data})
            }).catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
                setEmptyFields(error.response.data.emptyFields)
            })
        } catch (error) {
            setError(error);
            return error
        }
    }

    const unitDelete = async (unitId) => {
        try {
            await axios.delete(`http://127.0.0.1:4040/api/unit/${Department_ID}/${unitId}`)
            .then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null);
                setSuccess(response.data.Message)
                unitdispatch({type: "DELETE_UNITS", payload: response.data})
            })
            .catch((error) => {
                setError(error.response.data.Message)
                setTimeout(() => {
                    setError(null)
                }, 3000)
            })
        } catch (error) {
            setError(error);
            return error;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    return(
        <>
            {error &&
                (
                    <div className="error_message">
                        {error}
                    </div>
                )
            }
            {show ?
                (
                    <div className="success_message">
                        {success}
                    </div>
                ) :
                ("")
            }
            <div className="dept_container">
                <div className="dept">
                    <span className="plus" onClick={
                        () => {
                            setOpen(true); 
                            setEditShow(false);
                            setListUnits(false);
                            setAssign_HOD(false);
                            setEditUnit();
                            // removeDeptID();
                            // removeUnitIDParams();
                            removeAll();
                            setShowAddUnit(false);
                        }
                    }><FiIcons.FiPlus/></span>
                    { open &&
                        <form onSubmit={handleSubmit}>
                            <div className="dept_popup">
                                <span className="close"><MdIcons.MdOutlineCancel onClick={() => setOpen(false)} className="close_icon"/></span>
                                <div className="field">
                                    <label> Department Name</label>
                                    <TextInput
                                        autoFocus = {true}
                                        onChange = {deptlettersOnly}
                                        value = {create_dept}
                                        className = {emptyFields?.includes("dept_name") ? "error" : ""}
                                    />
                                </div>
                                <div className="field">
                                    <span className="add_unit" onClick={addUnit}>Add unit <FiIcons.FiPlus/></span>
                                </div>
                                { 
                                    addinputs.map((element, index) => (
                                        <div className="field" key={index}>
                                            <TextInput
                                                value = {element?.unit_name || ""}
                                                name = "unit_name"
                                                autoComplete = "off"
                                                autoFocus = {true}
                                                placeholder = "Enter unit name"
                                                className = {`unit_names ${element?.unit_name === "" ? "error" : ""}`}
                                                onChange = {e => handleInputChange(index, e)}
                                            />
                                            { index >= 0  ?
                                                (
                                                    <span onClick={removeUnit}>
                                                        <MdIcons.MdOutlineCancel className="unit_close" />
                                                    </span>
                                                ) :
                                                null
                                            }
                                        </div>
                                    ))
                                }
                                <div className="button">
                                    <Button type="submit" onClick = {createDept}>Create</Button>
                                </div>
                            </div>
                        </form>
                    }
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
                                        unit: <Button className="units" onClick={
                                            () => {
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                listOfUnits(dept._id);
                                                setListUnits(true); 
                                                setEditShow(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                            }
                                        }>Units</Button>,
                                        edit: <Button className="edit" onClick={
                                            () => {
                                                setEditShow(true);
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                setListUnits(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                                setShowAddUnit(false);
                                            }
                                        }>Edit</Button>,
                                        assign: <Button className="assign" onClick={
                                            () => {
                                                setAssign_HOD(true); 
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                setEditShow(false);
                                                setListUnits(false);
                                                setOpen(false);
                                                setShowAddUnit(false);
                                            }
                                        }>Assign</Button>,
                                        delete: <Button onClick={
                                            () => {
                                                del(dept._id);
                                                setEditShow(false);
                                                setListUnits(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                                setShowAddUnit(false);
                                                removeAll();
                                            }
                                        }>Delete</Button>
                                    }
                                ))}
                                fixedHeader
                                pagination
                                className='datatables'
                                loading={loading}
                            />
                        )
                    }
                    { listUnits && 
                        <div className="list_units">
                            <MdIcons.MdOutlineCancel className="unitlist_close" onClick={
                                () => 
                                    {
                                        setListUnits(false); 
                                        setShowAddUnit(false); 
                                        setEditUnit(false);
                                        removeAll();
                                    }
                                } />
                            {loading ? 
                                ("Loading please wait") :
                                (
                                    <div className="table">
                                        <DataTable
                                            columns={unitColumn}
                                            data={
                                                // units?.unit.length > 0 ? 
                                                // (
                                                    units?.map((unit) => (
                                                        {
                                                            unit_name: unit?.unit_name,
                                                            num_emp: unit?.employee_ids?.length,
                                                            edit: <Button className="edit_unit" onClick = {
                                                                () => {
                                                                    setEditUnit(true);
                                                                    navigate({pathname: '/department', search: `?dept_id=${Department_ID}&unit_id=${unit?._id}`});
                                                                }
                                                            }>Edit</Button>,
                                                            delete: <Button onClick = {() => unitDelete(unit?._id)}>Delete</Button>
                                                        }
                                                    ))
                                                // ) :
                                                // (
                                                //     units?.map((unit) => (
                                                //         {
                                                //             unit_name: unit?.unit_name,
                                                //             num_emp: unit?.employee_ids?.length,
                                                //             edit: <Button className="edit_unit" onClick = {
                                                //                 () => {
                                                //                     setEditUnit(true);
                                                //                     navigate({pathname: '/department', search: `?dept_id=${Department_ID}&unit_id=${unit?._id}`});
                                                //                 }
                                                //             }>Edit</Button>,
                                                //             delete: <Button onClick = {() => unitDelete(unit?._id)}>Delete</Button>
                                                //         }
                                                //     ))
                                                // )
                                            }
                                            fixedHeader
                                            pagination
                                            title = {
                                                units === null ? 
                                                ("") :
                                                (
                                                    <>
                                                        {<p className="dept_name">{units ? units[0]?.dept_name : ""} <FiIcons.FiPlus className="unit_plus" onClick={() => setShowAddUnit(true)}/> </p>}
                                                    </>
                                                )
                                            }
                                            className='datatables'
                                        />
                                    </div>
                                )
                            }
                        </div>
                    }
                    { editShow &&
                        <div className="popup">
                            <MdIcons.MdOutlineCancel className="popup_close" onClick={() => {
                                    setEditShow(false); 
                                    setShowAddUnit(false);
                                    setEditUnit(false);
                                    removeAll();
                                }} 
                            />
                            <form onSubmit={handleSubmit}>
                                <TextInput 
                                    className = {`popup_input ${emptyFields?.includes("edit_dept_name") ? "error" : ""}`}
                                    placeholder = "Department name"
                                    autoFocus = {true}
                                    value = {edit_deptName}
                                    onChange = {editlettersOnly}
                                />
                                <Button type="submit" onClick = {editDept}>Edit</Button>
                            </form>
                        </div>
                    }
                    { assign_HOD && 
                        <div className="popup"> 
                            <MdIcons.MdOutlineCancel className="popup_close" onClick={
                                () => {
                                    setAssign_HOD(false);
                                    setShowAddUnit(false);
                                    setEditUnit(false);
                                    removeAll();
                                }
                            } />
                            <form onSubmit={handleSubmit}>
                                <TextInput 
                                    className = {`popup_input email ${emptyFields?.includes("hod_email") ? "error" : ""}`}
                                    placeholder = "Employee Email"
                                    autoFocus = {true}
                                    value = {email}
                                    onChange = {emaillettersOnly}
                                />
                                <Button type="submit" onClick = {assignHod}>Assign</Button>
                            </form>
                        </div>
                    }
                    { showAddUnit && 
                        <div className="add_unit_poppup">
                            <MdIcons.MdOutlineCancel className="popup_close" onClick={() => {setShowAddUnit(false)}}/>
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <span className="add_unit" onClick={createUnit}>Add unit <FiIcons.FiPlus/></span>
                                </div>
                                <br />
                                <br />
                                <div className="below_add">
                                    { 
                                        addUnitInputs.map((element, index) => (
                                            <div className="field" key={index}>
                                                <TextInput
                                                    value = {element?.unit_name || ""}
                                                    name = "unit_name"
                                                    autoComplete = "off"
                                                    autoFocus = {true}
                                                    placeholder = "Enter unit name"
                                                    onChange = {e => handleUnitInputChange(index, e)}
                                                    className = {`${element?.unit_name === "" ? "error" : ""}`}
                                                />
                                                { index >= 0  ?
                                                    (
                                                        <span onClick={removecreateUnit}>
                                                            <MdIcons.MdOutlineCancel className="unit_close" />
                                                        </span>
                                                    ) :
                                                    null
                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                                <Button type="submit" onClick = {unitCreate}>Create</Button>
                            </form>
                        </div>
                    }
                    { editUnit && 
                        <div className="edit_popup">
                            <MdIcons.MdOutlineCancel className="popup_close" onClick={
                                () => {
                                    setEditUnit(false);
                                    removeUnitIDParams();
                                }
                                }/>
                            <form onSubmit={handleSubmit}>
                                <TextInput 
                                    placeholder = "Unit Name"
                                    autoFocus = {true}
                                    value = {edit_unitName}
                                    onChange = {unitlettersOnly}
                                    className = {emptyFields?.includes("edit_unit_name") ? "error" : ""}
                                />
                                <Button type="submit" onClick = {unitUpdate}>Edit</Button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default DeptHero;