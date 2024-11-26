import { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';
import services from '../../../customer/components/servicesData.jsx';

function AgentHome() {
  const [orders, setOrders] = useState({ pending: [], completed: [] });
  const agentId = localStorage.getItem('agentId'); // AgentId from localStorage

  useEffect(() => {
    fetchOrders();
  }, []);

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

      // Converts object of orders to array
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

  // Handle Accept Order
  const handleAccept = async (orderId,serviceId) => {
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

      if(data.message=="SUCCESSFULLY ACCEPTED"){
        alert(data.message);
        // Update the state
        setOrders((prevOrders) => {
          const updatedPending = prevOrders.pending.filter(
            (order) => order.orderId !== orderId
          );
          const acceptedOrder = prevOrders.pending.find(
            (order) => order.orderId === orderId
          );
          return {
            pending: updatedPending,
            completed: [...prevOrders.completed, acceptedOrder],
          };
        });
      }
      else{
        alert(data.message);
      }

    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  // Handle Reject Order
  const handleReject = async (orderId,serviceId) => {
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
        }),
      });

      const data = await response.json();
      if(data.message=="SUCCESSFULLY REJECTED"){
        alert(data.message);
        // Update the state
        setOrders((prevOrders) => {
          const updatedPending = prevOrders.pending.filter(
            (order) => order.orderId !== orderId
          );
          return {
            ...prevOrders,
            pending: updatedPending,
          };
        });
      }
      else{
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
            {orders.pending &&
              Object.entries(orders.pending).map(([serviceId, order]) => {
                const serviceDetails = getServiceDetails(order.cart[serviceId]);
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
                        <p className="text-blue-600 font-medium">{serviceDetails?.name || order.cart[serviceId]}</p>
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
                        onClick={() => handleAccept(order.orderId,serviceId)}
                      >
                        Accept Order
                      </button>
                      <button
                        className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                        onClick={() => handleReject(order.orderId,serviceId)}
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
        <div>
          <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">Completed Orders</h2>
          <div className="grid gap-4">
            {orders.completed.map((order) => (
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
