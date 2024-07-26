import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  employees: JSON.parse(localStorage.getItem('employees')) || [],
  idCounter: JSON.parse(localStorage.getItem('idCounter')) || 1 // Inicializar el contador en 1
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      const newEmployee = { ...action.payload, id: state.idCounter }; // Usar el contador como ID
      const updatedEmployees = [...state.employees, newEmployee];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      localStorage.setItem('idCounter', state.idCounter + 1); // Incrementar el contador
      return { ...state, employees: updatedEmployees, idCounter: state.idCounter + 1 };
    case 'EDIT_EMPLOYEE':
      const editedEmployees = state.employees.map(employee =>
        employee.id === action.payload.id ? action.payload : employee
      );
      localStorage.setItem('employees', JSON.stringify(editedEmployees));
      return { ...state, employees: editedEmployees };
    case 'DELETE_EMPLOYEE':
      const filteredEmployees = state.employees.filter(
        employee => employee.id !== action.payload
      );
      localStorage.setItem('employees', JSON.stringify(filteredEmployees));
      return { ...state, employees: filteredEmployees };
    default:
      return state;
  }
};

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state.employees));
    localStorage.setItem('idCounter', state.idCounter);
  }, [state.employees, state.idCounter]);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
