import React, { useState } from 'react';
import Adddepartment from './Adddepartment';
import Fetchemployee from './Fetchemployees';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Mandashboard = ( ) => {
    const location = useLocation();
    const userData = location.state;
    console.log(userData)
    // Check if userData is available
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    if (!userData) {
        return <Navigate to="/login" />  // Redirect to login page if user data is not available
    }

    return (
        <div>
            <div className="m-4 py-8 px-8 max-w-xlg mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face" />
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            Welcome {userData.username}
                        </p>
                        <p className="text-slate-500 font-medium">
                            {userData.role}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex gap-4">
                    <button onClick={() => handleOptionClick('viewEmployees')} className="px-4 m-4 py-2 text-white uppercase tracking-wide font-semibold rounded shadow bg-teal-500 hover:bg-teal-600">
                        View Employees
                    </button>
                    <button onClick={() => handleOptionClick('addDepartment')} className="px-4 m-4 py-2 text-white uppercase tracking-wide font-semibold rounded shadow bg-teal-500 hover:bg-teal-600">
                        Add Department
                    </button>
                </div>
            </div>
            <div>
                {selectedOption === 'viewEmployees' && <Fetchemployee />}
                {selectedOption === 'addDepartment' && <Adddepartment />}
            </div>
        </div>
    );
};

export default Mandashboard;
