import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employee";

export const listEmployee = () => axios.get(REST_API_BASE_URL);

export const saveEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (employee) => axios.get(REST_API_BASE_URL + '/' + employee);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee)

export const delteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);