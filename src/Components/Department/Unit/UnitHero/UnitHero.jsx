import React from 'react';
import { useState, useEffect } from "react";
import TextInput from '../../../TextInput/TextInput';
import Button from '../../../Button/Button';
import './UnitHero.css';
import { useLocation } from 'react-router-dom';
import DataTable from "react-data-table-component";
import useFetch from '../../../../hooks/useFetch';
import axios from "axios";
import { useUnitContext } from '../../../../hooks/useUnitContext';

const UnitHero = () =>{
    const {units, dispatch} = useUnitContext()
    const [loading, setLoading] = useState([false])
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState("");
    const [create, setCreate] = useState("");


    const location = useLocation();
    const Department_ID = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchUnits = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:4040/api/unit/${Department_ID}`);
                // console.log(response.data)
                dispatch({type: "ALL_UNITS", payload: response.data})
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchUnits();
    }, []);

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
        if(update === ""){
            return "Cannot edit without value"
        } else {
            try {
                const response = await axios.put(`http://127.0.0.1:4040/api/unit/${Department_ID}/${Unit_ID}`, {
                    unit_name: update
                });
                if(response) {
                    setUpdate('')
                    setError(null);
                    dispatch({type: "EDIT_UNITS", payload: response.data})
                }
            } catch (error) {
                setError(error);
                return error
            }
        }
    }

    const del =async (Unit_ID) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:4040/api/unit/${Department_ID}/${Unit_ID}`);
            if(response) {
                setError(null);
                dispatch({type: "DELETE_UNITS", payload: response.data})
            }
           } catch (error) {
                setError(error);
                return error;
           }
    }

    const createUnit = async (e) => {
        e.preventDefault()
        if(create === "") {
            return "cannot create unit with empty field"
        } else {
            try {
                const response = await axios.post(`http://127.0.0.1:4040/api/unit/${Department_ID}`, {unit_name: create}, {
                    headers: {
                      // 'application/json' is the modern content-type for JSON, but some
                      // older servers may use 'text/json'.
                      // See: http://bit.ly/text-json
                      'content-type': 'application/json'
                    }
                });
                if(response) {
                    setCreate('')
                    setError(null);
                    dispatch({type: "CREATE_UNIT", payload: response.data})
                }
            } catch (error) {
                setError(error);
                return error
            }
        }
    }

    const handleUpdate = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
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
                                units.map((unit) => (
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
                                onChange={(e) => setUpdate(e.target.value)}
                                required={true}
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
                        <form action="" onSubmit={createUnit}>
                            <div className="field">
                                <label>Create Unit:</label>
                                <TextInput 
                                    type="text"
                                    value={create}
                                    placeholder="Unit Name"
                                    onChange={(e) => setCreate(e.target.value)}
                                    required={true}
                                />
                                <Button type="submit" >Create</Button>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default UnitHero;