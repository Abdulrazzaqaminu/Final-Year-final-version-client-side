import './App.css';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Account from './Components/Account/Account';
import Dashboard from './Components/Dashboard/Dashboard';
import Department from './Components/Department/Department';
import Hod from './Components/Department/Hod/Hod';
import Unit from './Components/Department/Unit/Unit';
import Employees from './Components/Employees/Employees';
import SingleEmployee from './Components/Employees/SingleEmployee/SingleEmployee';
import AttendanceReport from './Components/Attendance/AttendanceReport/AttendanceReport';
import RecordAttendance from './Components/Attendance/RecordAttendance/RecordAttendance';
import Enrollment from './Components/Enrollment/Enrollment';
import Payroll from './Components/Payroll/Payroll';
import Loans from './Components/Loan/Loans';
import EmployeePayroll from './Components/Payroll/EmployeePayroll/EmployeePayroll';

function App() {
  return (
    <BrowserRouter>
       <div className="container">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/department" element={<Department />} />
            <Route exact path="/department/hod/:hod_id" element={<Hod />} />
            <Route exact path="/department/:departmentID/units" element={<Unit />} />
            <Route exact path="/employees" element={<Employees />} />
            <Route exact path="/employees/:employee_id" element={<SingleEmployee />} />
            <Route exact path="/attendance/record_attendance" element={<RecordAttendance />} />
            <Route exact path="/attendance/attendance_report" element={<AttendanceReport />} />
            <Route exact path="/enrollment" element={<Enrollment />} />
            <Route exact path="/payroll" element={<Payroll />} />
            <Route exact path="/loans" element={<Loans />} />
            <Route exact path="/payroll/employee_salary/:employee_id" element={<EmployeePayroll />} />
            <Route exact path="/Account" element={<Account />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
