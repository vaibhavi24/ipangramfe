import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Viewemployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3001/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/departments');
                setDepartmentList(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchEmployees();
        fetchDepartments();
    }, []);

    const handleChangeDepartment = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const filteredEmployees = selectedDepartment
        ? employees.filter((employee) => employee.department === selectedDepartment)
        : employees;

    return (
        <div className="p-10 md:px-20">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                    Select Department
                </label>
                <select
                    id="department"
                    value={selectedDepartment}
                    onChange={handleChangeDepartment}
                    className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="">All Departments</option>
                    {departmentList.map((department) => (
                        <option key={department} value={department}>{department}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((employee) => (
                    <div key={employee._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="relative">
                            <img className="w-full h-48 object-cover" src={employee.image} alt={employee.username} />
                        </div>
                        <div className="p-4">
                            <h1 className="text-lg text-black">{employee.username}</h1>
                        </div>   
                        <div className='text-center m-2 flex'>     
                            <p className='font-bold text-sm'>Mail : </p><p className="font-semibold text-xs"> {employee.email}</p>
                        </div>     
                        <div className='text-center m-2 flex'>     
                            <p className='font-bold text-sm'>Department : </p> <p className="font-semibold text-xs"> {employee.department}</p>
                        </div>     
                        <div className='text-center m-2 flex'>
                            <p className='font-bold text-sm'>Role : </p> <p className="font-semibold text-xs"> {employee.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Viewemployee;
