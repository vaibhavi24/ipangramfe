import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fetchemployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

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
            console.log(response.data);
            setDepartment(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const handleUpdateDepartment = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/employees/${selectedEmployee._id}`, {
                department: selectedDepartment
            });
            console.log('Department updated successfully:', response.data);
            // Refresh employee list
            fetchEmployees(); // Call fetchEmployees to refresh the list
            setSelectedEmployee(null); // Reset selectedEmployee
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    const handleFilterByDepartment = (dept) => {
        setSelectedDepartment(dept);
    };

    const filteredEmployees = selectedDepartment
        ? employees.filter((employee) => employee.department === selectedDepartment)
        : employees;

    return (
        <div>
            <div className="m-4 text-center">
                <p className="text-sm font-semibold mb-2">Filter by Department:</p>
                <div className="flex flex-wrap justify-center">
                    <button
                        className={`mr-2 mb-2 px-3 py-1 border rounded-md ${selectedDepartment === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleFilterByDepartment('')}
                    >
                        All
                    </button>
                    {department.map((dept, index) => (
                        <button
                            key={index}
                            className={`mr-2 mb-2 px-3 py-1 border rounded-md ${selectedDepartment === dept ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                            onClick={() => handleFilterByDepartment(dept)}
                        >
                            {dept}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20">
                {/* Filter buttons */}

                {/* Employee cards */}
                {filteredEmployees.map((employee) => (
                    <div key={employee._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="relative">
                            <img className="w-full h-48 object-cover" src={employee.image} alt={employee.username} />
                        </div>
                        <div className="p-4">
                            <h1 className="text-lg text-black">{employee.username}</h1>
                        </div>
                        <div className=' text-center m-2 flex'>
                            <p className='font-bold text-sm'>Mail : </p><p className="font-semibold text-xs"> {employee.email}</p>
                        </div>
                        <div className=' text-center m-2 flex'>
                            <p className='font-bold text-sm'>Department : </p> <p className="font-semibold text-xs"> {employee.department}</p>
                        </div>
                        <div className=' text-center m-2 flex'>
                            <p className='font-bold text-sm'>Role : </p> <p className="font-semibold text-xs"> {employee.role}</p>
                        </div>
                        <button
                            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                setSelectedEmployee(employee);
                            }}
                        >
                            Update Department
                        </button>
                    </div>
                ))}

                {/* Modal or form for updating department */}
                {selectedEmployee && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 transition-opacity"
                                aria-hidden="true"
                            >
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {/* Icon */}
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Update Department</h3>
                                            <div className="mt-2">
                                                <select
                                                    value={selectedDepartment}
                                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                                    className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                >
                                                    <option value="">Select Department</option>
                                                    {department.map((dept, index) => (
                                                        <option key={dept} value={dept}>{dept}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        onClick={handleUpdateDepartment}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setSelectedEmployee(null)}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Fetchemployee;
