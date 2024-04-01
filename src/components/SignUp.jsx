import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('role', formData.role);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirm_password', formData.confirm_password);
    formDataToSend.append('image', formData.image);
    
    try {
      const response = await axios.post('http://localhost:3001/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Registration successful:', response.data);
      // Handle successful registration, e.g., redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle failed registration
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input id="manager" name="role" type="radio" value="manager" required onChange={handleChange} className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300" />
                <label htmlFor="manager" className="ml-2 block text-sm text-gray-900">Manager</label>
              </div>
              <div className="flex items-center">
                <input id="employee" name="role" type="radio" value="employee" required onChange={handleChange} className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300" />
                <label htmlFor="employee" className="ml-2 block text-sm text-gray-900">Employee</label>
              </div>
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input name="username" type="username" required onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input name="email" type="email-address" autoComplete="email-address" required onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input name="password" type="password" autoComplete="password" required onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1">
                <input name="confirm_password" type="password" autoComplete="confirm-password" required onChange={handleChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
              <div className="mt-1 flex items-center">
                <input name="image" type="file" accept="image/*" required onChange={handleFileChange} className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                <span className="ml-2 text-sm text-gray-500">Upload an image</span>
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register Account</button>
            </div>
          </form>
          <p className='text-lg font-bold'>If you already have an account, <Link to="/" className='text-blue-700'>click here</Link>.</p>
                    
        </div>
      </div>
    </div>
  );
}
