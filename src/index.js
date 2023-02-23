import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DepartmentContextProvider } from './context/deptContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DepartmentContextProvider>
      <App />
    </DepartmentContextProvider>
  </React.StrictMode>
);