import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DepartmentContextProvider } from './context/deptContext';
import { UnitsContextProvider } from './context/unitContext';
import { EmployeeContextProvider } from './context/empContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DepartmentContextProvider>
      <UnitsContextProvider>
        <EmployeeContextProvider>
          <App />
        </EmployeeContextProvider>
      </UnitsContextProvider>
    </DepartmentContextProvider>
  </React.StrictMode>
);