import React, { useState } from 'react';
import axios from 'axios';

const Adddepartment = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/adddepartment', {
                department: departmentName
            });
            setSuccessMessage(response.data.message);
            setDepartmentName(''); // Clear input field
            setError("")
          } catch (error) {
          setDepartmentName(''); // Clear input field
          console.error('Error adding department:', error);
          setError('An error occurred while adding the department. Please try again later.');
          setError("")
        }
    };

    return (
      <div className="max-w-md mx-auto">
        <form onSubmit={handleFormSubmit} className="bg-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="m-4">
                <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Enter Department Name</label>
                <input 
                    type="text" 
                    id="department" 
                    name="department" 
                    value={departmentName} 
                    onChange={(e) => setDepartmentName(e.target.value)} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Department Name"
                />
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
            </div>
        </form>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
    </div>
    );
};

export default Adddepartment;
