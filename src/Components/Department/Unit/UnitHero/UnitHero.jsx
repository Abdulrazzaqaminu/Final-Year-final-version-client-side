import React from 'react';
import { useState } from "react";
import TextInput from '../../../TextInput/TextInput';
import Button from '../../../Button/Button';
import './UnitHero.css';

const UnitHero = () =>{
    const [update, setUpdate] = useState("");
    const [create, setCreate] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault()
    }
    return(
        <>
            <div className='unit_container'>
                <div className="unit_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Unit Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="unit_form">
                    <div className="unit_department">
                        <label>Department:</label>
                        <TextInput 
                            type="text"
                            disabled={true}
                        />
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
                                <Button type="submit">Update</Button>
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