// import React, { useEffect, useState } from 'react';
// import Layout from '../../layout.jsx';
// // import axios from 'axios';

// const AgentHome = () => {
//     const [orders, setOrders] = useState([]);


  
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/sa/orders", {
//           method: "POST", // Using POST method
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}), // Empty body for POST
//         });
//         const data = await response.json();
//         if (data.message != null) {
//           setServiceAgents(data.agents);
//         } else {
//           alert(data.message);
  
//         }
//       } catch (error) {
//         alert("Error fetching service agents. Please try again.");
//       }
//     };

//   // Fetch orders initially and at regular intervals
//   useEffect(() => {
//       fetchOrders(); // Initial fetch

//       const interval = setInterval(() => {
//           fetchOrders();
//       }, 5000); // Fetch every 5 seconds

//       return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//       // Accept order
//       const handleAccept = async (orderId) => {
//         try {
//             await axios.post('/api/orders/accept', { orderId, agentId });
//             alert('Order accepted successfully!');
//             fetchOrders(); // Refresh orders after accepting
//         } catch (error) {
//             console.error('Error accepting order:', error);
//         }
//     };

//     // Reject order
//     const handleReject = async (orderId) => {
//         try {
//             await axios.post('/api/orders/reject', { orderId, agentId });
//             alert('Order rejected successfully!');
//             fetchOrders(); // Refresh orders after rejecting
//         } catch (error) {
//             console.error('Error rejecting order:', error);
//         }
//     };

    // return (
//         <div>
//             <h1>Order Requests</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Customer ID</th>
//                         <th>Location</th>
//                         <th>Total Price</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order) => (
//                         <tr key={order.orderId}>
//                             <td>{order.orderId}</td>
//                             <td>{order.customerId}</td>
//                             <td>{order.location}</td>
//                             <td>{order.totalPrice}</td>
//                             <td>
//                                 <button onClick={() => handleAccept(order.orderId)}>Accept</button>
//                                 <button onClick={() => handleReject(order.orderId)}>Reject</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// const handleAccept = async (orderId) => {
//     try {
//         await axios.post('/api/orders/accept', { orderId });
//         alert('Order accepted successfully!');
//     } catch (error) {
//         console.error('Error accepting order:', error);
//     }
// };

// const handleReject = async (orderId) => {
//     try {
//         await axios.post('/api/orders/reject', { orderId });
//         alert('Order rejected successfully!');
//     } catch (error) {
//         console.error('Error rejecting order:', error);
//     }
// };

// export default AgentHome;

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
          <h1 className="text-2xl font-bold mt-2">Welcome</h1>
        </div>
    </div>
    </Layout>
  );
}
export default CustomerProfile;
