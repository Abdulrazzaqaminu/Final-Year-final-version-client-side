import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import './DeptHero.css';
import TextInput from "../../TextInput/TextInput";
import * as FiIcons from "react-icons/fi"
import * as MdIcons from "react-icons/md"
import Button from "../../Button/Button";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useDepartmentContext } from "../../../hooks/useDepartmentContext";
import { useUnitContext } from '../../../hooks/useUnitContext';
import Loading from "../../Loading/Loading";
import { confirmAlert } from 'react-confirm-alert'; // Import

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
    const [staffid, setStaffid] = useState("");
    const [edit_deptName, setEdit_DeptName] = useState("");
    const [edit_unitName, setEdit_UnitName] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false)
    const [listUnits, setListUnits] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [assign_HOD, setAssign_HOD] = useState(false);
    const [showHOD, setShowHOD] = useState(false);
    const [hodinfo, setHodinfo] = useState({});
    const [assigndate, setAssigndate] = useState("");
    const [hodname, seHODname] = useState("");
    const [hodid, seHODID] = useState("");

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
    const Staff_IDnumberOnly = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
          setStaffid(e.target.value);
        }
    };

    const departmentColumn = [
        {
            name: "Department Name",
            selector: row => row.department_name,
            sortable: true,
            width: "180px"
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
            sortable: true,
            width: "180px"

        },
        {
            name: "Employees",
            selector: row => row.num_emp,
            sortable: true,
            width: "120px"
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
    const particularHOD = async (HOD_ID) => {
        try {
            await axios.get(`http://127.0.0.1:4040/api/hod/${HOD_ID}`)
            .then((response) => {
                setHodinfo(response.data)
            })
            .catch((error) => {
                setError(error)  
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
    const confirmDeptCreate = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Create Department?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => createDept()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
    const [edit_dept_name, setEdit_Dept_Name] = useState("");
    const confirmDeptEdit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Edit ${edit_dept_name} department name?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => editDept()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }

    const assignHod = async () => {
        try {
            await axios.put(`http://127.0.0.1:4040/api/hod/${Department_ID}`, {dept_HOD_id: staffid}, {
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
                    setStaffid("")
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
    const [deptname, setDeptname] = useState('');
    const confirmAssignHOD = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Assign HOD to ${deptname} department?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => assignHod()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
    const confirmDeptDelete = (Department_ID, deptname) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Delete ${deptname} Department?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => del(Department_ID)
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
    const confirmUnitCreate = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Create Unit(s)?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => unitCreate()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
    const [unit_update_name, setUnit_Update_Name] = useState("");
    const confirmUnitUpdate = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Edit ${unit_update_name} unit name?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => unitUpdate()
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
    const confirmUnitDelete = (unitId, unitname) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Delete ${unitname} unit?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => unitDelete(unitId)
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    let today = new Date(assigndate);
    let options = {
        weekday: "long", 
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    let day = today.toLocaleDateString("en-us", options)

    const removeHOD = async (Hod_ID) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4040/api/hod/${Hod_ID}`)
            if(response) {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setShowHOD(false)
                dispatch({type: "EDIT_DEPARTMENT", payload: response.data})
            }
        } catch (error) {
            setError(error)
        }
    }
    const confirmRemoveHod = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Remove ${hodname} as HOD?.`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => removeHOD(hodid)
              },
              {
                label: 'No',
                onClick: () => alert('Click Ok')
              }
            ]
        });
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
            { loading ?
                ( <Loading /> ):
                (
                    <div className="dept_container">
                        <div className="dept">
                            <span className="plus" onClick={
                                () => {
                                    setOpen(true); 
                                    setEditShow(false);
                                    setListUnits(false);
                                    setAssign_HOD(false);
                                    setShowHOD(false);
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
                                        <div className="dept_popup_container">
                                            <div className="field">
                                                <label> Department Name</label>
                                                <TextInput
                                                    autoFocus = {true}
                                                    onChange = {deptlettersOnly}
                                                    value = {create_dept}
                                                    className = {create_dept === "" ? "error" : ""}
                                                    // className = {emptyFields?.includes("dept_name") ? "error" : ""}
                                                />
                                            </div>
                                            <div className="field">
                                                <span className="add_unit" onClick={() => addUnit()}>Add unit <FiIcons.FiPlus/></span>
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
                                                        { index ?
                                                            (
                                                                <span onClick={() => removeUnit(index)}>
                                                                    <MdIcons.MdOutlineCancel className="unit_close" />
                                                                </span>
                                                            ) :
                                                            null
                                                        }
                                                    </div>
                                                ))
                                            }
                                            <div className="button">
                                                <Button type="submit" onClick = {() => {
                                                    confirmDeptCreate()
                                                    setOpen(false)
                                                }}>Create</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }  
                            <DataTable
                                columns={departmentColumn}
                                data={departments?.map((dept, index) => (
                                    {
                                        department_name: dept?.dept_name,
                                        hod: dept?.dept_HOD?.hod_id === "N/A" ? 
                                            (   <>
                                                    <b>{dept?.dept_HOD?.hod_last_name}</b>
                                                    <small>
                                                        <p className="text-muted">{dept?.dept_HOD?.hod_first_name}</p>
                                                    </small> 
                                                </>
                                            ) :
                                            (
                                                <div className="hod" onClick={
                                                    () => {
                                                        setShowHOD(true);
                                                        setListUnits(false); 
                                                        setEditShow(false);
                                                        setAssign_HOD(false);
                                                        setOpen(false);
                                                        particularHOD(dept?.dept_HOD?.hod_id);
                                                        setAssigndate(dept?.dept_HOD?.hod_assign_date);
                                                        seHODID(dept?.dept_HOD?.hod_id);
                                                        seHODname(dept?.dept_HOD?.hod_last_name)
                                                    }
                                                    }>
                                                    <b>{dept?.dept_HOD?.hod_last_name}</b>
                                                    <small>
                                                        <p className="text-muted">{dept?.dept_HOD?.hod_first_name}</p>
                                                    </small> 
                                                </div>
                                            ),
                                        unit: <Button className="units" onClick={
                                            () => {
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                listOfUnits(dept._id);
                                                setListUnits(true); 
                                                setEditShow(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                                setShowHOD(false);
                                            }
                                        }>Units</Button>,
                                        edit: <Button className="edit" onClick={
                                            () => {
                                                setEditShow(true);
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                setListUnits(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                                setEdit_Dept_Name(dept?.dept_name);
                                                setDeptname("");
                                                setUnit_Update_Name("");
                                                setShowAddUnit(false);
                                                setShowHOD(false);
                                            }
                                        }>Edit</Button>,
                                        assign: <Button className="assign" onClick={
                                            () => {
                                                setAssign_HOD(true); 
                                                navigate({pathname: '/department', search: `?dept_id=${dept._id}`});
                                                setEditShow(false);
                                                setListUnits(false);
                                                setOpen(false);
                                                setDeptname(dept?.dept_name);
                                                setEdit_Dept_Name("");
                                                setUnit_Update_Name("")
                                                setShowAddUnit(false);
                                                setShowHOD(false);
                                            }
                                        }>Assign</Button>,
                                        delete: <Button onClick={
                                            () => {
                                                confirmDeptDelete(dept?._id, dept?.dept_name);
                                                setEditShow(false);
                                                setListUnits(false);
                                                setAssign_HOD(false);
                                                setOpen(false);
                                                setShowAddUnit(false);
                                                removeAll();
                                                setShowHOD(false);
                                            }
                                        }>Delete</Button>
                                    }
                                ))}
                                fixedHeader
                                pagination
                                className='datatables'
                            />

                            { showHOD &&
                                <div className="hod_pop_container">
                                    <span className="close"><MdIcons.MdOutlineCancel onClick={() => {setShowHOD(false); setHodinfo({})}} className="close_icon"/></span>
                                    <ul>
                                        <li onClick={confirmRemoveHod}>Remove HOD</li>
                                    </ul>
                                    <form>
                                        <div className="field">
                                            <label>First Name:</label>
                                            <p>{hodinfo?.hod_first_name}</p>
                                        </div>
                                        <div className="field">
                                            <label>Last Name:</label>
                                            <p><b>{hodinfo?.hod_last_name}</b></p>
                                        </div>
                                        <div className="field">
                                            <label>Email:</label>
                                            <p>{hodinfo?.hod_email}</p>
                                        </div>
                                        <div className="field">
                                            <label>Department:</label>
                                            <p>{hodinfo?.department?.dept_name}</p>
                                        </div>
                                        <div className="field">
                                            <label>Assigned On:</label>
                                            <p>{day}</p>
                                        </div>
                                    </form>
                                </div>
                            }

                            { listUnits && 
                                <div className="list_units">
                                    <MdIcons.MdOutlineCancel className="unitlist_close" onClick={
                                        () => 
                                            {
                                                setListUnits(false); 
                                                setShowAddUnit(false); 
                                                setEditUnit(false);
                                                setShowHOD(false);
                                                removeAll();
                                            }
                                        } />
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
                                                                        setUnit_Update_Name(unit?.unit_name);
                                                                        setDeptname("");
                                                                        setEdit_Dept_Name("");
                                                                        navigate({pathname: '/department', search: `?dept_id=${Department_ID}&unit_id=${unit?._id}`});
                                                                        setShowAddUnit(false);
                                                                        setShowHOD(false);
                                                                    }
                                                                }>Edit</Button>,
                                                                delete: <Button onClick = {() => {
                                                                    confirmUnitDelete(unit?._id, unit?.unit_name);
                                                                    setUnit_Update_Name("");
                                                                    setDeptname("");
                                                                    setEdit_Dept_Name("");
                                                                    setListUnits(false);
                                                                    setEditUnit(false);
                                                                    setShowAddUnit(false);
                                                                    setShowHOD(false);
                                                                }}>Delete</Button>
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
                                                            {<p className="dept_name">{units ? units[0]?.dept_name : ""} <FiIcons.FiPlus className="unit_plus" onClick={
                                                                () => {
                                                                    setShowAddUnit(true);
                                                                    setEditShow(false);                 
                                                                    setEditUnit(false);
                                                                    setShowHOD(false);
                                                                }
                                                                }/> </p>}
                                                        </>
                                                    )
                                                }
                                                className='datatables'
                                            />
                                        </div>
                                </div>
                            }
                            { editShow &&
                                <div className="popup">
                                    <span className="popup_close">
                                        <MdIcons.MdOutlineCancel className="popup_close_icon" onClick={() => {
                                                setEditShow(false); 
                                                setShowAddUnit(false);
                                                setEditUnit(false);
                                                setShowHOD(false);
                                                removeAll();
                                            }} 
                                        />
                                    </span>
                                    <form onSubmit={handleSubmit}>
                                        <TextInput 
                                            className = {`popup_input ${emptyFields?.includes("edit_dept_name") ? "error" : ""}`}
                                            placeholder = "Department name"
                                            autoFocus = {true}
                                            value = {edit_deptName}
                                            onChange = {editlettersOnly}
                                        />
                                        <Button type="submit" onClick = {() => {
                                            confirmDeptEdit()
                                            setEditShow(false);
                                        }}>Edit</Button>
                                    </form>
                                </div>
                            }
                            { assign_HOD && 
                                <div className="popup"> 
                                    <span className="popup_close">
                                        <MdIcons.MdOutlineCancel className="popup_close_icon" onClick={
                                            () => {
                                                setAssign_HOD(false);
                                                setShowAddUnit(false);
                                                setEditUnit(false);
                                                setShowHOD(false);
                                                removeAll();
                                            }
                                        } />
                                    </span>
                                    <form onSubmit={handleSubmit}>
                                        <TextInput 
                                            className = {`popup_input ${emptyFields?.includes("hod_id") ? "error" : ""}`}
                                            placeholder = "Staff ID"
                                            autoFocus = {true}
                                            maxLength={4}
                                            value = {staffid}
                                            onChange = {Staff_IDnumberOnly}
                                        />
                                        <Button type="submit" onClick = {() => {
                                            confirmAssignHOD()
                                            setAssign_HOD(false);
                                        }}>Assign</Button>
                                    </form>
                                </div>
                            }
                            { showAddUnit && 
                                <div className="add_unit_poppup">
                                    <MdIcons.MdOutlineCancel className="popup_close" onClick={
                                        () => {
                                            setShowAddUnit(false);
                                            setShowHOD(false);
                                    }}/>
                                    <form onSubmit={handleSubmit}>
                                        <div className="field">
                                            <span className="add_unit" onClick={() => createUnit()}>Add unit <FiIcons.FiPlus/></span>
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
                                                                <span onClick={() => removecreateUnit(index)}>
                                                                    <MdIcons.MdOutlineCancel className="unit_close" />
                                                                </span>
                                                            ) :
                                                            null
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <Button type="submit" onClick = {() => {
                                            confirmUnitCreate()
                                            setListUnits(false);
                                            setEditUnit(false);
                                            setShowAddUnit(false);
                                            setShowHOD(false);
                                        }}>Create</Button>
                                    </form>
                                </div>
                            }
                            { editUnit && 
                                <div className="edit_popup">
                                    <span className="popup_close">
                                        <MdIcons.MdOutlineCancel className="popup_close_icon" onClick={
                                            () => {
                                                setEditUnit(false);
                                                setShowHOD(false);
                                                removeUnitIDParams();
                                            }
                                        }/>
                                    </span>
                                    <form onSubmit={handleSubmit}>
                                        <TextInput 
                                            placeholder = "Unit Name"
                                            autoFocus = {true}
                                            value = {edit_unitName}
                                            onChange = {unitlettersOnly}
                                            className = {emptyFields?.includes("edit_unit_name") ? "error" : ""}
                                        />
                                        <Button type="submit" onClick = {() => {
                                            setListUnits(false);
                                            setEditUnit(false);
                                            confirmUnitUpdate();
                                            setShowHOD(false);
                                            setShowAddUnit(false);
                                        }}>Edit</Button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DeptHero;