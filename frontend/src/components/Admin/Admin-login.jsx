import React, { useState } from 'react';
import { FaBus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      const url = 'http://localhost:5000/api/auth/admin/login';
      const response = await axios.post(url, { email, password }, { withCredentials: true });

      if (response.status === 201) {
        navigate('/admin-dashboard');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 transition duration-300 transform bg-white shadow-2xl rounded-2xl hover:scale-105">
        <FaBus className="w-16 h-16 mx-auto mb-6 text-indigo-600" />
        <h4 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h4>
        <p className="mt-2 text-center text-gray-600">
          Enter your login details below
        </p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <label className="text-gray-700">
              Email
              <input
                type="email"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 transition duration-200 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </label>
            <label className="text-gray-700">
              Password
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 transition duration-200 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </label>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-500"
              id="remember"
            />
            <label htmlFor="remember" className="ml-2 text-gray-600 cursor-pointer">
              I agree to the 
              <a href="#" className="ml-1 text-indigo-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            className="w-full px-4 py-3 mt-6 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
