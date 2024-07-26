import { useEffect, useState } from "react";
import {
  getEmployee,
  saveEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  const formValidation = () => {
    let isValid = true;
    const newErrors = { firstName: "", lastName: "", role: "" };

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!role.trim()) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const saveEmployeeData = (event) => {
    event.preventDefault();
    if (formValidation()) {
      const employee = { firstName, lastName, role };
      console.log("Employee Save:", employee);
      saveEmployee(employee).then((response) => {
        console.log(response.data);
        navigate("/employee");
      });
    }
  };

  const updateEmployeeData = (event) => {
    event.preventDefault();
    if (formValidation()) {
      const employee = { firstName, lastName, role };
      console.log("Employee Update:", employee);
      updateEmployee(id, employee).then((response) => {
        console.log(response.data);
        navigate("/employee");
      });
    }
  };

  const dynamicTitile = () => {
    if (id) {
      return <h3 className="text-center mt-3">Update Employee</h3>;
    } else {
      return <h3 className="text-center mt-3">Add Employee</h3>;
    }
  };

  const dynamicButton = () => {
    if (id) {
      return (
        <button
          type="submit"
          className="btn btn-success mt-3"
          onClick={updateEmployeeData}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="btn btn-success mt-3"
          onClick={saveEmployeeData}
        >
          Save
        </button>
      );
    }
  };

  useEffect(() => {
    getEmployee(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setRole(response.data.role);
      })
      .catch((errors) => console.log(console.info(errors)));
  }, [id]);

    const cancel = () => navigate(`/employee`);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card mt-5" style={{ width: "30%" }}>
          {dynamicTitile()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name 
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name 
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="role" className="form-label">
                  Role 
                </label>
                <input
                  type="text"
                  id="role"
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  placeholder="Enter Role"
                  value={role}
                  onChange={handleRoleChange}
                />
                {errors.role && (
                  <div className="invalid-feedback">{errors.role}</div>
                )}
              </div>
              <div className="text-center">
                {dynamicButton()}
                <button
                  type="submit"
                  className="btn btn-danger mt-3"
                  style={{ marginLeft: "4px" }}
                  onClick={cancel}
                >
                  cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
