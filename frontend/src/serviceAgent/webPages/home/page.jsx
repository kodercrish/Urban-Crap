import { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';
import services from '../../../customer/components/servicesData.jsx';

function AgentHome() {
  const [orders, setOrders] = useState({ pending: {}, completed: {} });
  const agentId = localStorage.getItem('agentId'); // AgentId from localStorage



  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/sa/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ agentId: parseInt(agentId) })
  //     });
  //     const data = await response.json();

  //     const serviceAgent = data.agent;

  //     // Converts object of orders to array
  //     const pendingOrders = serviceAgent.pending_orders ?
  //       Object.values(serviceAgent.pending_orders) : [];
  //     const completedOrders = serviceAgent.completed_orders ?
  //       Object.values(serviceAgent.completed_orders) : [];

  //     setOrders({
  //       pending: pendingOrders,
  //       completed: completedOrders
  //     });

  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // };

  // In the fetchOrders function
  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/sa/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ agentId: parseInt(agentId) })
  //     });
  //     const data = await response.json();
  //     const serviceAgent = data.agent;
  //     console.log(data);
  //     console.log(serviceAgent);

  //     // Convert HashMap to arrays for both pending and completed orders
  //     const pendingOrders = Object.entries(serviceAgent.pending_orders || {}).flatMap(([serviceId, orderList]) => orderList);
  //     const completedOrders = Object.entries(serviceAgent.completed_orders || {}).flatMap(([serviceId, orderList]) => orderList);

  //     console.log(pendingOrders);

  //     setOrders({
  //       pending: pendingOrders,
  //       completed: completedOrders
  //     });
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
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
  
      // Create a map of service IDs to orders
      const pendingOrders = {};
      const completedOrders = {};
  
      // Process pending orders
      if (serviceAgent.pending_orders) {
        Object.entries(serviceAgent.pending_orders).forEach(([serviceId, orderList]) => {
          orderList.forEach(order => {
            pendingOrders[serviceId] = order;
          });
        });
      }
      console.log(pendingOrders);
      
      // Process completed orders
      if (serviceAgent.completed_orders) {
        Object.entries(serviceAgent.completed_orders).forEach(([serviceId, orderList]) => {
          orderList.forEach(order => {
            completedOrders[serviceId] = order;
          });
        });
      }
  
      setOrders({
        pending: pendingOrders,
        completed: completedOrders
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  useEffect(() => {
    fetchOrders(); // Initial fetch

    const interval = setInterval(() => {
      fetchOrders(); // Fetch orders every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);


  
  // // Handle Accept Order
  // const handleAccept = async (orderId, serviceId) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/sa/acceptOrder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         agentId: parseInt(agentId),
  //         orderId: parseInt(orderId),
  //         itemId: serviceId
  //       })
  //     });
  //     console.log(pendingOrders);
  //     console.log(completedOrders);

  //     const data = await response.json();

  //     if (data.message == "SUCCESSFULLY ACCEPTED") {
  //       await fetchOrders();
  //       alert(data.message);
  //     }

  //   } catch (error) {
  //     console.error('Error accepting order:', error);
  //   }
  // };

  // // const handleAccept = async (orderId, serviceId) => {
  // //   try {
  // //     const response = await fetch('http://localhost:8080/api/sa/acceptOrder', {
  // //       method: 'POST',
  // //       headers: {
  // //         'Content-Type': 'application/json',
  // //       },
  // //       body: JSON.stringify({
  // //         agentId: parseInt(agentId),
  // //         orderId: orderId,
  // //         itemId: serviceId
  // //       })
  // //     });

  // //     const data = await response.json();
  // //     if(data.message === "SUCCESSFULLY ACCEPTED") {
  // //       // Fetch updated orders immediately after successful acceptance
  // //       await fetchOrders();
  // //       alert(data.message);
  // //     }
  // //   } catch (error) {
  // //     console.error('Error accepting order:', error);
  // //   }
  // // };


  // // Handle Reject Order
  // const handleReject = async (orderId, serviceId) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/sa/rejectOrder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         agentId: parseInt(agentId),
  //         orderId: parseInt(orderId),
  //         itemId: serviceId
  //       }),
  //     });

  //     const data = await response.json();
  //     if (data.message == "SUCCESSFULLY REJECTED") {
  //       await fetchOrders();  // Refresh the orders list
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error rejecting order:', error);
  //   }
  // };
  // const getServiceDetails = (serviceId) => {
  //   for (const category in services) {
  //     const service = services[category].find(s => s.id === serviceId);
  //     if (service) return service;
  //   }
  //   return null;
  // };

  // return (
  //   <Layout>
  //     <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
  //       <h1 className="text-[#1c4e80] text-4xl font-bold mb-6">
  //         Service Agent Dashboard
  //       </h1>

  //       {/* Pending Orders Section */}
  //       <div className="mb-8">
  //         <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">Pending Orders</h2>
  //         <div className="grid gap-6">
  //           {orders.pending &&
  //             Object.entries(orders.pending).map(([serviceId, order]) => {
  //               const serviceDetails = getServiceDetails(order.cart[serviceId]);
  //               return (
  //                 <div key={`${order.orderId}-${serviceId}`}
  //                   className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
  //                   <div className="grid grid-cols-4 gap-6">
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Order ID</p>
  //                       <p className="text-blue-600 font-medium">{order.orderId}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Service</p>
  //                       <p className="text-blue-600 font-medium">{serviceDetails?.name || order.cart[serviceId]}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Price</p>
  //                       <p className="text-green-600 font-medium">{serviceDetails?.price}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Location</p>
  //                       <p className="text-blue-600 font-medium">{order.location}</p>
  //                     </div>
  //                   </div>

  //                   {serviceDetails && (
  //                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
  //                       <p className="text-sm text-gray-600">{serviceDetails.description}</p>
  //                       <div className="mt-2">
  //                         <p className="text-sm font-medium text-gray-700">Service Includes:</p>
  //                         <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
  //                           {serviceDetails.includes.map((item, index) => (
  //                             <li key={index} className="text-sm text-gray-600 flex items-center">
  //                               <span className="mr-2">•</span>
  //                               {item}
  //                             </li>
  //                           ))}
  //                         </ul>
  //                       </div>
  //                     </div>
  //                   )}

  //                   <div className="flex mt-6 space-x-4">
  //                     <button
  //                       className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
  //                       onClick={() => handleAccept(order.orderId, order.cart[serviceId])}
  //                     >
  //                       Accept Order
  //                     </button>
  //                     <button
  //                       className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
  //                       onClick={() => handleReject(order.orderId, order.cart[serviceId])}
  //                     >
  //                       Reject Order
  //                     </button>
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //         </div>
  //       </div>

  //       {/* Completed Orders Section */}
  //       <div className="bg-white rounded-xl p-6 shadow-lg">
  //         <h2 className="text-2xl font-semibold text-green-600 mb-4 border-b pb-2">
  //           Completed Orders
  //         </h2>
  //         <div className="grid gap-6">
  //           {orders.completed &&
  //             Object.entries(orders.completed).map(([serviceId, order]) => {
  //               const serviceDetails = getServiceDetails(order.cart[serviceId]);
  //               return (
  //                 <div key={`completed-${order.orderId}-${serviceId}`}
  //                   className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
  //                   <div className="grid grid-cols-4 gap-6">
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Order ID</p>
  //                       <p className="text-blue-600 font-medium">{order.orderId}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Service</p>
  //                       <p className="text-blue-600 font-medium">{serviceDetails?.name || order.cart[serviceId]}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Price</p>
  //                       <p className="text-green-600 font-medium">{serviceDetails?.price}</p>
  //                     </div>
  //                     <div className="space-y-2">
  //                       <p className="font-semibold text-gray-700">Location</p>
  //                       <p className="text-blue-600 font-medium">{order.location}</p>
  //                     </div>
  //                   </div>

  //                   {serviceDetails && (
  //                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
  //                       <p className="text-sm text-gray-600">{serviceDetails.description}</p>
  //                       <div className="mt-2">
  //                         <p className="text-sm font-medium text-gray-700">Service Includes:</p>
  //                         <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
  //                           {serviceDetails.includes.map((item, index) => (
  //                             <li key={index} className="text-sm text-gray-600 flex items-center">
  //                               <span className="mr-2">•</span>
  //                               {item}
  //                             </li>
  //                           ))}
  //                         </ul>
  //                       </div>
  //                     </div>
  //                   )}
  //                 </div>
  //               );
  //             })}
  //         </div>
  //       </div>

  //     </div>
  //   </Layout>
  // );

  // Handle Accept Order
const handleAccept = async (orderId, serviceId) => {
  try {
    const response = await fetch('http://localhost:8080/api/sa/acceptOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentId: parseInt(agentId),
        orderId: parseInt(orderId),
        itemId: serviceId
      })
    });

    const data = await response.json();
    if (data.message === "SUCCESSFULLY ACCEPTED") {
      await fetchOrders();
      alert(data.message);
    }
  } catch (error) {
    console.error('Error accepting order:', error);
  }
};

// Handle Reject Order
const handleReject = async (orderId, serviceId) => {
  try {
    const response = await fetch('http://localhost:8080/api/sa/rejectOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentId: parseInt(agentId),
        orderId: parseInt(orderId),
        itemId: serviceId
      })
    });

    const data = await response.json();
    if (data.message === "SUCCESSFULLY REJECTED") {
      await fetchOrders();
      alert(data.message);
    }
  } catch (error) {
    console.error('Error rejecting order:', error);
  }
};

const getServiceDetails = (serviceId) => {
  for (const category in services) {
    const service = services[category].find(s => s.id === serviceId);
    if (service) return service;
  }
  return null;
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
        <div className="grid gap-6">
          {Object.entries(orders.pending).map(([serviceId, order]) => {
            const serviceDetails = getServiceDetails(serviceId);
            return (
              <div key={`${order.orderId}-${serviceId}`}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Order ID</p>
                    <p className="text-blue-600 font-medium">{order.orderId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Service</p>
                    <p className="text-blue-600 font-medium">{serviceDetails?.name || serviceId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Price</p>
                    <p className="text-green-600 font-medium">{serviceDetails?.price}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-blue-600 font-medium">{order.location}</p>
                  </div>
                </div>

                {serviceDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{serviceDetails.description}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Service Includes:</p>
                      <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                        {serviceDetails.includes.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex mt-6 space-x-4">
                  <button
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                    onClick={() => handleAccept(order.orderId, serviceId)}
                  >
                    Accept Order
                  </button>
                  <button
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                    onClick={() => handleReject(order.orderId, serviceId)}
                  >
                    Reject Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Orders Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 border-b pb-2">
          Completed Orders
        </h2>
        <div className="grid gap-6">
          {Object.entries(orders.completed).map(([serviceId, order]) => {
            const serviceDetails = getServiceDetails(serviceId);
            return (
              <div key={`completed-${order.orderId}-${serviceId}`}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Order ID</p>
                    <p className="text-blue-600 font-medium">{order.orderId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Service</p>
                    <p className="text-blue-600 font-medium">{serviceDetails?.name || serviceId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Price</p>
                    <p className="text-green-600 font-medium">{serviceDetails?.price}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-blue-600 font-medium">{order.location}</p>
                  </div>
                </div>

                {serviceDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{serviceDetails.description}</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Service Includes:</p>
                      <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                        {serviceDetails.includes.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Layout>
);

}

export default AgentHome;
