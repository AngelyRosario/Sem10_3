import React, { useState } from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css';

function App() {
  const [editEmployee, setEditEmployee] = useState(null);

  return (
    <EmployeeProvider>
      <div className="App">
        <h1>Ingrese los Datos del Empleado</h1>
        <EmployeeForm editEmployee={editEmployee} setEditEmployee={setEditEmployee} />
        <EmployeeTable setEditEmployee={setEditEmployee} />
      </div>
    </EmployeeProvider>
  );
}

export default App;
