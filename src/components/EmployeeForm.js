import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeForm = ({ editEmployee, setEditEmployee }) => {
  const { dispatch, state } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({ id: '', name: '', address: '', city: '' });

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    } else {
      setEmployee({ id: '', name: '', address: '', city: '' });
    }
  }, [editEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.address && employee.city) {
      if (editEmployee) {
        dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
        setEditEmployee(null);
      } else {
        dispatch({ type: 'ADD_EMPLOYEE', payload: { ...employee, id: state.idCounter } });
      }
      setEmployee({ id: '', name: '', address: '', city: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Correo"
        value={employee.address}
        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Ciudad"
        value={employee.city}
        onChange={(e) => setEmployee({ ...employee, city: e.target.value })}
        required
      />
      <button type="submit">{editEmployee ? 'Update' : 'Añadir'}</button>
    </form>
  );
};

export default EmployeeForm;
