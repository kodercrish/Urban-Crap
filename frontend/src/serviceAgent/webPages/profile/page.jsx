// CustomerProfile.js

import React from 'react';
import Layout from '../../layout.jsx';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'; // Import icons

// Define styles
const styles = {
  container: {
    width: '80%',
    maxWidth: '800px',
    margin: '50px auto',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1c4e80',
    color: 'white',
    padding: '30px 20px',
    borderRadius: '10px 10px 0 0',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#f0f4f8', // Light background for image placeholder
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    color: '#1c4e80',
    border: '3px solid white',
    marginBottom: '15px',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0 0',
  },
  welcomeMessage: {
    fontSize: '16px',
    color: '#666',
    marginTop: '10px',
    textAlign: 'center',
  },
  profileDetails: {
    marginTop: '30px',
  },
  profileTitle: {
    color: '#1c4e80',
    fontSize: '20px',
    fontWeight: 'bold',
    paddingBottom: '8px',
    marginBottom: '20px',
    borderBottom: '2px solid #1c4e80',
    textAlign: 'center',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  icon: {
    color: '#1c4e80',
    marginRight: '12px',
    fontSize: '20px',
  },
  label: {
    fontWeight: '600',
    color: '#333',
    marginRight: '10px',
  },
  value: {
    color: '#555',
  },
};

// Functional component for Customer Profile
const CustomerProfile = ({ name, phoneNumber, email }) => {
  return (
    <Layout>
      <div style={styles.container}>
        
        {/* Header Section with Profile Image */}
        <div style={styles.header}>
          
          <h1 style={styles.headerTitle}>Welcome, [Agent Name]{name}!</h1>
        </div>

        {/* Welcome Message */}
        <div style={styles.welcomeMessage}>
          <p>We're glad to have you here! Check your profile details below.</p>
        </div>

        {/* Profile Details Section */}
        <div style={styles.profileDetails}>
          <h2 style={styles.profileTitle}>Profile Details</h2>

          <div style={styles.detail}>
            <FaUser style={styles.icon} />
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{name}</span>
          </div>

          <div style={styles.detail}>
            <FaPhone style={styles.icon} />
            <span style={styles.label}>Phone Number:</span>
            <span style={styles.value}>{phoneNumber}</span>
          </div>

          <div style={styles.detail}>
            <FaEnvelope style={styles.icon} />
            <span style={styles.label}>Email Address:</span>
            <span style={styles.value}>{email}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
