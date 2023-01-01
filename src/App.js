import './App.css';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Account from './Components/Account/Account';
import Dashboard from './Components/Dashboard/Dasboard';
import Department from './Components/Deparment/Department';
import Employees from './Components/Employees/Employees';
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
            <Route exact path="/employees" element={<Employees />} />
            <Route exact path="/attendance/record_attendance" element={<RecordAttendance />} />
            <Route exact path="/attendance/attendance_report" element={<AttendanceReport />} />
            <Route exact path="/enrollment" element={<Enrollment />} />
            <Route exact path="/payroll" element={<Payroll />} />
            <Route exact path="/loans" element={<Loans />} />
            <Route exact path="/employee_payroll/:id" element={<EmployeePayroll />} />
            <Route exact path="/Account" element={<Account />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
