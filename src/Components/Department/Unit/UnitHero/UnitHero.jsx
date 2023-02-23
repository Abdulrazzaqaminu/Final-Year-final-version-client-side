import React from 'react';
import { useState } from "react";
import TextInput from '../../../TextInput/TextInput';
import Button from '../../../Button/Button';
import './UnitHero.css';
import { useLocation } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import DataTable from "react-data-table-component";

const UnitHero = () =>{
    const location = useLocation();
    const Department_ID = location.pathname.split("/")[2];
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/unit/${Department_ID}`);

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

    const edit = (id) => {
        console.log(id)
    }
    const del = (id) => {
        console.log(id)
    }

    const [update, setUpdate] = useState("");
    const [create, setCreate] = useState("");

    const handleSubmit = async (e) =>{
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
                        data={
                            data[0]?.unit.map(unit => (
                                {
                                    unit_name: unit.unit_name,
                                    num_emp: unit.employee_ids.length,
                                    edit: <Button className="edit" onClick={() => edit(unit._id)}>Edit</Button>,
                                    delete: <Button onClick={() => del(unit._id)}>Delete</Button>
                                }
                            ))
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
                        {
                            data?.map((dept, index) => (
                                <TextInput 
                                    key={index}
                                    type="text"
                                    disabled={true}
                                    placeholder = {dept.dept[0].dept_name}
                                />
                             ))
                         }
                    </div>
                    <div className="unit_update">
                        <form action="" onSubmit={handleSubmit}>
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
                        </form>
                    </div>
                    <div className="unit_create">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Create Unit:</label>
                                <TextInput 
                                    type="text"
                                    value={create}
                                    placeholder="Unit Name"
                                    onChange={(e) => setCreate(e.target.value)}
                                    required={true}
                                />
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default UnitHero;