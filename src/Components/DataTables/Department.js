import './Datatable.css'
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import DataTable from "react-data-table-component";
import useFetch from '../../hooks/useFetch';

const Department = () => {

    const {data, loading, error, reFetch} = useFetch("http://127.0.0.1:4040/api/department");

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
    
    return(
        <>
            {loading ? 
                ("Loading Please wait") : 
                (   <DataTable
                        columns={departmentColumn}
                        data={data.map((dept, index) => (
                            {
                                department_name: dept.dept_name,
                                hod: dept.dept_HOD.hod_id === "N/A" ? 
                                    (   <>
                                            {dept.dept_HOD.hod_first_name} <b>{dept.dept_HOD.hod_last_name}</b>
                                            <small>
                                                <p className="text-muted">{dept.dept_HOD.hod_email}</p>
                                            </small> 
                                        </>
                                    ) :
                                    (
                                        <Link className="hod" to={`/department/hod/${dept.dept_HOD.hod_id}`}>
                                            {dept.dept_HOD.hod_first_name} <b>{dept.dept_HOD.hod_last_name}</b>
                                            <small>
                                                <p className="text-muted">{dept.dept_HOD.hod_email}</p>
                                            </small> 
                                        </Link>
                                    ),
                                unit: <Link to={`/department/${dept._id}/units`}>  
                                        <Button className="units">Units</Button>
                                    </Link>,
                                edit: <Button className="edit">Edit</Button>,
                                delete: <Button>Delete</Button>
                            }
                        ))}
                        fixedHeader
                        pagination
                        className='datatables'
                    />
                )
            }
        </>
    )
}

export default Department;