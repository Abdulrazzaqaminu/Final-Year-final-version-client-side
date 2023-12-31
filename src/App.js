import './App.css';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Department from './Components/Department/Department';
import Employees from './Components/Employees/Employees';
import SingleEmployee from './Components/Employees/SingleEmployee/SingleEmployee';
import AttendanceReport from './Components/Attendance/AttendanceReport/AttendanceReport';
import RecordAttendance from './Components/Attendance/RecordAttendance/RecordAttendance';
import Payroll from './Components/Payroll/Payroll';
import Loans from './Components/Loan/Loans';
import Leave from './Components/Leave/Leave';
import Login from './Components/Login/Login';
import EmployeePayroll from './Components/Payroll/EmployeePayroll/EmployeePayroll';

function App() {
  return (
    <BrowserRouter>
       <div className="container">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/department" element={<Department />} />
            <Route exact path="/employees" element={<Employees />} />
            <Route exact path="/employees/:employee_id" element={<SingleEmployee />} />
            <Route exact path="/attendance/record_attendance" element={<RecordAttendance />} />
            <Route exact path="/attendance/attendance_report" element={<AttendanceReport />} />
            <Route exact path="/payroll" element={<Payroll />} />
            <Route exact path="/loans" element={<Loans />} />
            <Route exact path="/leave" element={<Leave />} />
            <Route exact path="/payroll/employee_salary/:employee_id" element={<EmployeePayroll />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
