import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import {Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password, role });
            const uData = response.data.data;
            if (uData.role === 'manager') {
                navigate("/mandashboard", { state: uData}); // Redirect to admin dashboard with state
            } else if (uData.role === 'employee') {
                navigate("/empdashboard", { state: uData}); // Redirect to admin dashboard with state
            } else {
                setError('Incorrect email or password'); // Show error message for other roles or scenarios
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='mt-5'>
            <section className="py-26 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="max-w-lg mx-auto">
                        <form onSubmit={handleLogin}>
                            {/* Role selection */}
                            <div className="flex flex-row mb-6">
                                <div className="flex items-center mr-6">
                                    <input type="radio" id="manager" name="role" value="manager" checked={role === 'manager'} onChange={() => setRole('manager')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                    <label htmlFor="manager" className="ml-2 block text-sm text-gray-900">Manager</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="employee" name="role" value="employee" checked={role === 'employee'} onChange={() => setRole('employee')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                                    <label htmlFor="employee" className="ml-2 block text-sm text-gray-900">Employee</label>
                                </div>
                            </div>
                            {/* Email input */}
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="email">Email</label>
                                <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {/* Password input */}
                            <div className="mb-6">
                                <label className="block mb-2 font-extrabold" htmlFor="password">Password</label>
                                <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="password" id="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* Error message */}
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {/* Sign in button */}
                            <button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200" type="submit">Sign in</button>
                        </form>
                        <p className='text-lg font-bold'>If you don't have an account, <Link to="/signup" className='text-blue-700'>click here</Link>.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
