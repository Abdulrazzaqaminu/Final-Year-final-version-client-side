import React from 'react';
import { useState, useEffect } from "react";
import TextInput from '../../../TextInput/TextInput';
import Button from '../../../Button/Button';
import './UnitHero.css';
import { useLocation } from 'react-router-dom';
import DataTable from "react-data-table-component";
import axios from "axios";
import { useUnitContext } from '../../../../hooks/useUnitContext';

const UnitHero = () =>{
    const {units, dispatch} = useUnitContext()
    const [loading, setLoading] = useState([false])
    const [emptyFields, setEmptyFields] = useState([])

    const [update, setUpdate] = useState("");
    const [create, setCreate] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false)

    const location = useLocation();
    const Department_ID = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchUnits = async () => {
            setLoading(true);
            try {
                await axios.get(`http://127.0.0.1:4040/api/unit/${Department_ID}`)
                .then((response) => {
                    setError(null)
                    dispatch({type: "ALL_UNITS", payload: response.data})
                })
                .catch((error) => {
                    setError(error.response.data.Message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    dispatch({type: "ALL_UNITS", payload: error.response.data.unit})
                })
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchUnits();
    }, []);

    const editlettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setUpdate(e.target.value);
        }
    };
    const createlettersOnly = (e) => {
        const regex = /^[a-zA-Z\b\s]+$/;
        if ((e.target.value) === "" || regex.test(e.target.value)) {
            setCreate(e.target.value);
        }
    };

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

    const edit = async (Unit_ID) => {
        try {
            await axios.put(`http://127.0.0.1:4040/api/unit/${Department_ID}/${Unit_ID}`, {
                unit_name: update
            }).then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null)
                setSuccess(response.data.Message)
                setEmptyFields([])
                setUpdate('')
                dispatch({type: "EDIT_UNITS", payload: response.data})
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

    const del =async (Unit_ID) => {
        try {
            await axios.delete(`http://127.0.0.1:4040/api/unit/${Department_ID}/${Unit_ID}`)
            .then((response) => {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setError(null);
                setSuccess(response.data.Message)
                dispatch({type: "DELETE_UNITS", payload: response.data})
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

    const createUnit = async (e) => {
        try {
            await axios.post(`http://127.0.0.1:4040/api/unit/${Department_ID}`, {unit_name: create}, {
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
                setCreate('')
                setError(null);
                dispatch({type: "CREATE_UNIT", payload: response.data})
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
            <div className='unit_container'>
                <div className="unit_table">
                {loading ? 
                ("Loading Please wait") : 
                (
                    <DataTable
                        columns={unitColumn}
                        data={ units?.length < 1 ?
                            ("") :
                            (
                                units?.map((unit) => (
                                    {
                                        unit_name: unit.unit_name,
                                        num_emp: unit?.employee_ids?.length,
                                        edit: <Button className="edit" onClick={() => edit(unit?._id)}>Edit</Button>,
                                        delete: <Button onClick={() => del(unit?._id)}>Delete</Button>
                                    }
                                ))
                            )
                            
                        }
                        fixedHeader
                        pagination
                        className='datatables'
                    />
                )
            }
                </div>
                <div className="unit_form">
                    <div className="unit_department">
                        <label>Department:</label>
                            <TextInput 
                                type="text"
                                disabled={true}
                                placeholder = {
                                    units === null ? 
                                    ("") :
                                    (
                                        units[0]?.dept?.dept_name
                                    )
                                    
                                }
                            />
                    </div>
                    <div className="unit_update">
                        <div className="field">
                            <label>Update Unit:</label>
                            <TextInput 
                                type="text"
                                value={update}
                                onChange={editlettersOnly}
                                className = {emptyFields?.includes("edit_unit_name") ? "error" : ""}
                            />
                            <TextInput 
                                type="text"
                                placeholder = "Enter unit name above"
                                onChange={(e) => setUpdate(e.target.value)}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="unit_create">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Create Unit:</label>
                                <TextInput 
                                    type="text"
                                    value={create}
                                    onChange={createlettersOnly}
                                    className = {emptyFields?.includes("unit_name") ? "error" : ""}
                                />
                                <Button type="submit" onClick={createUnit}>Create</Button>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default UnitHero;