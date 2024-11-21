// CustomerProfile.js
import React, { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = ({ name, phoneNumber, email }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const agentToken = localStorage.getItem('agentId');
    console.log(agentToken);
    if (!agentToken) {
      navigate("/agent/SignIn");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if(!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="w-4/5 max-w-[800px] mx-auto my-12 bg-white rounded-lg shadow-lg p-5">
        
        {/* Header Section */}
        <div className="flex flex-col items-center bg-[#1c4e80] text-white p-8 rounded-t-lg">
          <h1 className="text-2xl font-bold mt-2">Welcome, {name}!</h1>
        </div>

        {/* Welcome Message */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-base">We're glad to have you here! Check your profile details below.</p>
        </div>

        {/* Profile Details Section */}
        <div className="mt-8">
          <h2 className="text-[#1c4e80] text-xl font-bold pb-2 mb-5 border-b-2 border-[#1c4e80] text-center">
            Profile Details
          </h2>

          <div className="flex items-center py-3 border-b border-gray-200">
            <FaUser className="text-[#1c4e80] mr-3 text-xl" />
            <span className="font-semibold text-gray-700 mr-2">Name:</span>
            <span className="text-gray-600">{name}</span>
          </div>

          <div className="flex items-center py-3 border-b border-gray-200">
            <FaPhone className="text-[#1c4e80] mr-3 text-xl" />
            <span className="font-semibold text-gray-700 mr-2">Phone Number:</span>
            <span className="text-gray-600">{phoneNumber}</span>
          </div>

          <div className="flex items-center py-3 border-b border-gray-200">
            <FaEnvelope className="text-[#1c4e80] mr-3 text-xl" />
            <span className="font-semibold text-gray-700 mr-2">Email Address:</span>
            <span className="text-gray-600">{email}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
