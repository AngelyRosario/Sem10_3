import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeTable = ({ setEditEmployee }) => {
  const { state, dispatch } = useContext(EmployeeContext);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo Electronico</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {state.employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.address}</td>
            <td>{employee.city}</td>
            <td>
              <button onClick={() => setEditEmployee(employee)}>Editar</button>
              <button onClick={() => dispatch({ type: 'DELETE_EMPLOYEE', payload: employee.id })}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
