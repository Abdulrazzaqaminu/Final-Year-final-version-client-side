import './Datatable.css'
import Button from "../Button/Button";
import DataTable from 'react-data-table-component';

const Unit = () => {
    const unitColumn = [
        {
            name: "Unit Name",
            selector: row => row.unit_name,
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
    const unitData = [
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
        {
            unit_name: "Software Engineering",
            edit: <Button className="edit">Edit</Button>,
            delete: <Button>Delete</Button>
        },
    ]
    return(
        <>
            <DataTable
                columns={unitColumn}
                data={unitData}
                fixedHeader
                pagination
                className='datatables'
            />
        </>
    )
}

export default Unit;