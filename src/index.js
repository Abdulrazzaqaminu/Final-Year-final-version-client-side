import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DepartmentContextProvider } from './context/deptContext';
import { UnitsContextProvider } from './context/unitContext';
import { EmployeeContextProvider } from './context/empContext';
import { LoanContextProvider } from './context/loanContext';
import { LeaveContextProvider } from './context/leaveContext';
import { EnrollContextProvider } from './context/enrollContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <DepartmentContextProvider>
      <UnitsContextProvider>
        <EmployeeContextProvider>
          <LoanContextProvider>
            <LeaveContextProvider>
              <EnrollContextProvider>
                <App />
              </EnrollContextProvider>
            </LeaveContextProvider>
          </LoanContextProvider>
        </EmployeeContextProvider>
      </UnitsContextProvider>
    </DepartmentContextProvider>
  // </React.StrictMode>
);