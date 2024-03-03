import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on new submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return; // Stop the form submission
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }), // Use the password from state
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError('OTP Verification failed')
        console.error('OTP Verification failed' , response);
      }
    } catch (error) {
      setError('An Internal Error Occured ')
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            name="otp"
            id="otp"
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
