import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService'; // Update with your actual service function
import './ViewEmployee.css'; // Import the CSS file for the animation

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    getEmployee(id) // Fetch employee details by ID
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  if (!employee) return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container mt-2 d-flex justify-content-center align-items-center" >
      <div className="card mt-5 animate-popup" style={{ width: "40%" }}>
        <div className="card-header">
          <h1 className="card-title">Employee Details</h1>
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">Employee Id:</dt>
            <dd className="col-sm-9">{employee.id}</dd>

            <dt className="col-sm-3">First Name:</dt>
            <dd className="col-sm-9">{employee.firstName}</dd>

            <dt className="col-sm-3">Last Name:</dt>
            <dd className="col-sm-9">{employee.lastName}</dd>

            <dt className="col-sm-3">Role:</dt>
            <dd className="col-sm-9">{employee.role}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
