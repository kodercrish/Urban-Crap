import { useState, useEffect } from 'react';
import Layout from '../../layout.jsx';

function AgentHome() {
  const [orders, setOrders] = useState({ pending: [], completed: [] });
  const agentId = localStorage.getItem('agentId'); // Assuming you store agentId in localStorage

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
