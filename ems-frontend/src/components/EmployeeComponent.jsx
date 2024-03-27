import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    // 파라미터 값 가져오기
    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email:''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    // 변화 감지 후 해당 값을 담는다.
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm){

            const employee = {firstName, lastName, email}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else {
            errorsCopy.firstName = '이름을 입력하세요.';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else {
            errorsCopy.lastName = '성을 입력하세요.';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else {
            errorsCopy.email = '이메일을 입력하세요.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2>직원 정보 수정</h2>
        }else{
            return <h2>직원 등록</h2>
        }

    }

  return (
    <div className='container'>
        <br/>
        <div className='row'>
            <div className='card'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type='text' 
                            placeholder='이름'
                            name='firstName' 
                            value={firstName} 
                            className='form-control'
                            onChange={handleFirstName}>
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input type='text' 
                            placeholder='성'
                            name='lastName' 
                            value={lastName} 
                            className='form-control'
                            onChange={handleLastName}>
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input type='text' 
                            placeholder='이메일'
                            name='email' 
                            value={email} 
                            className='form-control'
                            onChange={handleEmail}>
                            </input>
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>등록</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent