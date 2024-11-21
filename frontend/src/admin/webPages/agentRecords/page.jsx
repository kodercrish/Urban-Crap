import Layout from '../../layout.jsx';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentRecords = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   // Check if the admin is authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem("adminId"); // Example: storing a token in local storage
    if (!adminToken) {
      navigate("/admin/SignIn"); // Redirect to login if no token is found
    } else {
      setIsAuthenticated(true); // Mark as authenticated
    }
  }, [navigate]);

      // Only render the page if the admin is authenticated
  if (!isAuthenticated) {
    return null; // Optionally display a loading spinner here
  }
    
  return (
    <Layout>
        {/* complete this devre and mittal */}
    </Layout>
  );
}

export default AgentRecords;
