import React, { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";


const AgentProfile = () => {

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    range: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the admin is authenticated
  useEffect(() => {
    const agentToken = localStorage.getItem('agentId');
    if (!agentToken) {
      navigate("/agent/SignIn"); // Redirect to login if no token is found
    } else {
      setIsAuthenticated(true); // Mark as authenticated
      fetchProfileData(agentToken);
    };
  }, [navigate]);

  const fetchProfileData = async (agentId) => {
    try {
      const response = await fetch('http://localhost:8080/api/getagentdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: parseInt(agentId)
        })
      });

      const data = await response.json();
      if (data.agent) {
        const agentData = data.agent;
        setProfileData({
          name: agentData.name,
          email: agentData.email,
          location: agentData.location,
          range: agentData.range,
        });
      } else {
        console.error('Failed to fetch profile data');
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Only render the page if the admin is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="w-4/5 max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg p-5">

        {/* Header Section */}
        <div className="flex flex-col items-center bg-[#1c4e80] text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold mt-2">Welcome, {profileData.name}!</h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center text-gray-600 mt-4">
          <p>We're glad to have you here! Check your profile details below.</p>
        </div>

        {/* Profile Details Section */}
        <div className="mt-8">
          <h2 className="text-[#1c4e80] text-2xl font-bold pb-2 mb-5 border-b-2 border-[#1c4e80] text-center">
            Profile Details
          </h2>

          <div className="flex items-center py-3 border-b border-gray-200">
            <FaUser className="text-[#1c4e80] text-xl mr-3" />
            <span className="font-semibold text-gray-700 mr-2">Name:</span>
            <span className="text-gray-600">{profileData.name}</span>
          </div>

          <div className="flex items-center py-3 border-b border-gray-200">
            <FaEnvelope className="text-[#1c4e80] text-xl mr-3" />
            <span className="font-semibold text-gray-700 mr-2">Email Address:</span>
            <span className="text-gray-600">{profileData.email}</span>
          </div>


          <div className="flex items-center py-3 border-b border-gray-200">
            <FaPhone className="text-[#1c4e80] text-xl mr-3" />
            <span className="font-semibold text-gray-700 mr-2">Location:</span>
            <span className="text-gray-600">{profileData.location}</span>
          </div>


          <div className="flex items-center py-3 border-b border-gray-200">
            <FaMapMarkerAlt className="text-[#1c4e80] text-xl mr-3" />
            <span className="font-semibold text-gray-700 mr-2">Service Radius:</span>
            <span className="text-gray-600">{profileData.range}</span>
            <span className="font-semibold text-gray-700 ml-2">km</span>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default AgentProfile;
