package net.study.emsbackend.service;

import net.study.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    // 직원 정보를 생성한다.
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    // Id에 해당하는 직원의 정보을 찾는다.
    EmployeeDto getEmployeeById(Long employeeId);

    // 모든 직원의 정보를 조회한다.
    List<EmployeeDto> getAllEmployees();

    // 해당 Id의 직원 정보를 수정한다.
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    // 해당 Id의 직원 정보를 삭제한다.
    void deleteEmployee(Long employeeId);
}
