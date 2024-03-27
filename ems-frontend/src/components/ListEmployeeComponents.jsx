import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

function ListEmployeeComponent() {
        
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmplyees();
    }, [])
    
    function getAllEmplyees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    // 해당 경로의 페이지를 찾아간다.
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmplyees()
        }).catch(error => {
            console.log(error);
        })
    }

  return (
    <div className='container'>

        <h2 className='text-center'>직원 목록</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>직원 등록</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>성</th>
                    <th>이메일</th>
                    <th>수정 및 삭제</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>정보 수정</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft:'10px'}}
                                >삭제</button>
                            </td>
                        </tr>
                    )
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent