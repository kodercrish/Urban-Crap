// import Layout from '../../layout.jsx';
// import { useState, useEffect } from 'react';

// function AgentHome() {
//   const [pendingOrders, setPendingOrders] = useState([]);
//   const [completedOrders, setCompletedOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/sa/orders', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//           body: JSON.stringify({
//             agentId: localStorage.getItem('agentId')
//           })
//         });
//         const data = await response.json();
//         console.log("Response data:", data);
//     console.log("Agent data:", data.agent);
//     console.log("Pending orders:", data.agent?.pending_orders);
//         if (data.agent) {
//           setPendingOrders(data.agent.pending_orders);
//           setCompletedOrders(data.agent.completed_orders);
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };
    

//     fetchOrders();
//   }, []);

//   return (
//     <Layout>
//       <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
//         {/* Header Section */}
//         <h1 className="text-[#1c4e80] text-4xl font-bold mb-6">
//           Service Agent Dashboard
//         </h1>
//         <p className="text-gray-700 text-lg mb-8">
//           Manage your orders and services efficiently
//         </p>

//         {/* Dashboard Grid */}
//         <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Pending Orders Card */}
// <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//   <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Pending Orders</h2>
//   <div className="max-h-60 overflow-y-auto">
//     {Object.keys(pendingOrders).length === 0 ? (
//       <p className="text-gray-500 p-4">No pending orders available</p>
//     ) : (
//       Object.entries(pendingOrders).map(([customer, service], index) => (
//         <div key={index} className="border-b p-4 hover:bg-gray-50">
//           <p className="font-medium text-[#1c4e80]">Order #{index + 1}</p>
//           <p className="text-gray-700">Customer: {JSON.stringify(customer)}</p>
//           <p className="text-gray-600">Service: {service}</p>
//           <p className="text-gray-500 text-sm mt-2">Status: Pending</p>
//         </div>
//       ))
//     )}
//   </div>
// </div>



//           {/* Completed Orders */}
//           <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Completed Orders</h2>
//             <div className="max-h-60 overflow-y-auto">
//               {Object.entries(completedOrders).map(([customer, service], index) => (
//                 <div key={index} className="border-b p-2">
//                   <p className="font-medium">Customer: {customer.name}</p>
//                   <p className="text-gray-600">Service: {service}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AgentHome;

import { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';

function AgentHome() {
  const [orders, setOrders] = useState({ pending: [], completed: [] });
  const agentId = localStorage.getItem('agentId'); // Assuming you store agentId in localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/sa/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ agentId: parseInt(agentId) })
//       });
//       const data = await response.json();
//       console.log('Full response:', data);
      
//       // Access the orders through the agent object from the response
//       const serviceAgent = data.agent;
//       console.log('Service Agent data:', serviceAgent);
      
//       if (serviceAgent && serviceAgent.pendingOrders) {
//         setOrders({
//           pending: serviceAgent.pendingOrders || [],
//           completed: serviceAgent.completedOrders || []
//         });
//       }
      
//       console.log('Updated orders state:', orders);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
// };
const fetchOrders = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/sa/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agentId: parseInt(agentId) })
    });
    const data = await response.json();
    
    const serviceAgent = data.agent;
    
    // Convert object of orders to array
    const pendingOrders = serviceAgent.pending_orders ? 
      Object.values(serviceAgent.pending_orders) : [];
    const completedOrders = serviceAgent.completed_orders ?
      Object.values(serviceAgent.completed_orders) : [];
    
    setOrders({
      pending: pendingOrders,
      completed: completedOrders
    });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};




  return (
    <Layout>
      <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
        <h1 className="text-[#1c4e80] text-4xl font-bold mb-6">
          Service Agent Dashboard
        </h1>

        {/* Pending Orders Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">Pending Orders</h2>
          <div className="grid gap-4">
          {orders.pending && orders.pending.map((order, index) => (
  <div key={`${order.id}-${index}`} className="bg-white p-4 rounded-lg shadow">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="font-semibold">Order ID</p>
        <p>{order.orderId}</p>
      </div>
      <div>
        <p className="font-semibold">Service ID</p>
        <p>{order.serviceId}</p>
      </div>
      <div>
        <p className="font-semibold">Customer Location</p>
        <p>{order.customerLocation}</p>
      </div>
    </div>
  </div>
))}

          </div>
        </div>

        {/* Completed Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">Completed Orders</h2>
          <div className="grid gap-4">
            {orders.completed.map(order => (
              <div key={order.orderId} className="bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold">Order ID</p>
                    <p>{order.orderId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Service ID</p>
                    <p>{order.serviceId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Customer Location</p>
                    <p>{order.customerLocation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AgentHome;
