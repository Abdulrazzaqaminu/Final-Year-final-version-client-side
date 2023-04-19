import Employees from '../../DataTables/Employees';
import './EmpHero.css'

const EmpHero = () =>{
    return(
        <>
            <div className="emp-container">
                <div className="table">
                    <Employees />
                </div> 
            </div>
        </>
    )
}

export default EmpHero;