import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // For storing the file
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFullName(data.fullName || '');
          setEmail(data.email || '');
          setAddress(data.address || '');
          setAge(data.age || '');
          setDateOfBirth(data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch profile.');
          if (errorData.message === 'Token is not valid') {
          console.error("Session expired. Please log in again.");
          localStorage.removeItem('token');
          return <Navigate to="/login" />;
          }
        }
      } catch (error) {
        setError('An error occurred while fetching the profile.');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const profilePhotoInputRef = useRef(); // Ref for the file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login again');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('address', address);
    formData.append('age', age);
    formData.append('dateOfBirth', dateOfBirth);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfile(updatedData);
        setProfilePhoto(null); // Clear the selected file
        alert('Profile updated successfully.');
      } else {
        console.error('Failed to update profile');
        const errorData = await response.json();
        console.error('Error Data:', errorData);
      }
    } catch (error) {
      console.error('An error occurred while updating the profile.', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
    {profile?.profilePhoto && (
      <img src={profile.profilePhoto} alt="Profile" className="w-40 h-40 rounded-full mb-4" />
    )}
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col">
        <label htmlFor="fullName" className="mb-2 font-medium text-gray-600">Full Name:</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium text-gray-600">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="mb-2 font-medium text-gray-600">Address:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="age" className="mb-2 font-medium text-gray-600">Age:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dateOfBirth" className="mb-2 font-medium text-gray-600">Date of Birth:</label>
        <input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="profilePhoto" className="mb-2 font-medium text-gray-600">Profile Photo:</label>
        <input
          ref={profilePhotoInputRef}
          id="profilePhoto"
          type="file"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
          className="input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Update Profile
      </button>
    </form>
    <button onClick={handleLogout} className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
      Logout
    </button>
  </div>
);

};

export default Profile;
