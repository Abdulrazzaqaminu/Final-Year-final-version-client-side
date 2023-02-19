import './Datatable.css'
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DataTable from "react-data-table-component";

const Department = () => {
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
            name: "Delete",
            selector: row => row.delete,
            sortable: true
        },
    ]
    const departmentData = [
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            department_name: "Administration",
            hod: <Link className="hod" to="/department/hod/:hod_id">
                            Abdulrazzaq Aminu
                            <small>
                                <p className="text-muted">abdulrazzaqaminu@gmail.com</p>
                            </small> 
                        </Link> ,
            unit: <Link to="/department/:departmentID/units">  
                    <Button className="units">Units</Button>
                </Link>,
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
    ]
    return(
        <>
            <DataTable
                columns={departmentColumn}
                data={departmentData}
                fixedHeader
                pagination
                className='datatables'
            />
        </>
    )
}

export default Department;