package com.api.rest.react.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.rest.react.entity.Employee;
import com.api.rest.react.serviceimp.EmployeeService;

import lombok.AllArgsConstructor;

@CrossOrigin("http://localhost:3000")
@RestController
@AllArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeRestController {

	private EmployeeService employeeService;

	// Build Add Employee Rest API

	@PostMapping
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
		Employee saveEmployee = employeeService.createEmployee(employee);
		return new ResponseEntity<>(saveEmployee, HttpStatus.CREATED);
	}

	// Build Get Employee Rest API

	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("id") long EMployeeId) {
		Optional<Employee> employee = employeeService.FindByEmployee(EMployeeId);
		if (employee.get() != null)
			return ResponseEntity.ok(employee.get());
		return ResponseEntity.notFound().build();
	}
	// Build Get All Employee Rest API

	@GetMapping
	public ResponseEntity<List<Employee>> getAllEmployees() {
		List<Employee> employees = employeeService.getAllEmployee();

		if (!employees.isEmpty()) {
			return ResponseEntity.ok(employees);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Build Update Employee Rest API

	@PutMapping("{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long employeeId,
			@RequestBody Employee employee) {
		Employee updatedData = employeeService.updateEmployee(employeeId, employee);
		if (updatedData != null)
			return ResponseEntity.ok(updatedData);
		return ResponseEntity.notFound().build();
	}

	// Build delete Employee Rest API
	@DeleteMapping("{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable("id") long EMployeeId) {
		Employee employee = employeeService.deleteEmployee(EMployeeId);
		if (employee != null)
			return ResponseEntity.ok(employee);
		return ResponseEntity.notFound().build();
	}

}