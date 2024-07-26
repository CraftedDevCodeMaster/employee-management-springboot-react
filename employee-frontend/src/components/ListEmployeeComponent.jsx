import { useEffect, useState } from "react";
import { delteEmployee, listEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function AddnewEMployee() {
    navigator("/new-employee");
  }
  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  // function removeEmployee(id)
  // {
  //     delteEmployee(id).then((response) =>
  //     {
  //         getAllEmployee()
  //     }).catch(error => console.log(error))
  // }

  function removeEmployee(id) {
    delteEmployee(id)
      .then(() => {
        // Immediately filter out the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => console.log("Error deleting employee:", error));
    }
    
    function viewEmployeeData(id)
    {
        navigator(`/view-employee/${id}`);
    }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">List of Employees</h1>
          <button className="btn btn-primary mb-4" onClick={AddnewEMployee}>
            Add Employee
                  </button>
          <table className="table table-sm table-dark">
            <thead className="bg-dark text-white">
              <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Update & Delete </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.role}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        className="btn btn-warning"
                        onClick={() => updateEmployee(employee.id)}
                      >
                        update
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => viewEmployeeData(employee.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
