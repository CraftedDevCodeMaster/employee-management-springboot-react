package com.api.rest.react.serviceimp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.rest.react.entity.Employee;
import com.api.rest.react.repository.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepo employeeRepo;

	public Employee createEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}

	public Optional<Employee> FindByEmployee(long id) {
		return employeeRepo.findById(id);
	}

	public List<Employee> getAllEmployee() {
		return employeeRepo.findAll();
	}

	public Employee updateEmployee(long id, Employee employee) {
		Optional<Employee> updateEmployee = employeeRepo.findById(id);
		if (updateEmployee.get() != null) {
			updateEmployee.get().setFirstName(employee.getFirstName());
			updateEmployee.get().setLastName(employee.getLastName());
			updateEmployee.get().setRole(employee.getRole());
			employeeRepo.save(updateEmployee.get());
			return updateEmployee.get();
		}
		return null;
	}

	public Employee deleteEmployee(long id) {
		Employee deleteEmployee = employeeRepo.findById(id).get();

		if (deleteEmployee != null) {
			employeeRepo.delete(deleteEmployee);
			return deleteEmployee;
		}
		return null;

	}
}
