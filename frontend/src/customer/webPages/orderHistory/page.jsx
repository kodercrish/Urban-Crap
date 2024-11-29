import React, { useRef, useState, useEffect } from 'react';
import Layout from '../../layout.jsx';
import { useNavigate } from 'react-router-dom';
import { services } from '../../components/servicesData';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const customerToken = localStorage.getItem('customerId');
        if (!customerToken) {
            navigate("/customer/SignIn");
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            const customerId = localStorage.getItem('customerId');

            try {
                const response = await fetch('http://localhost:8080/api/order-history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        customerId: parseInt(customerId),
                    })
                });
                const data = await response.json();
                setOrders(data.orders);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (!isAuthenticated) return null;

    return (
        <Layout>
            <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-16 px-8">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Order History</h1>

                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && orders && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="bg-blue-500 p-4">
                                    <h2 className="text-white font-bold text-xl">Order #{order.orderId}</h2>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600 font-semibold">
                                            Status: {order.orderStatus}
                                        </span>
                                        <span className="text-green-600 font-bold">₹{order.totalPrice}</span>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">Services Ordered:</h3>
                                        <ul className="space-y-2">
                                            {order.cart.map((serviceId, index) => {
                                                const service = Object.values(services)
                                                    .flat()
                                                    .find(service => service.id === serviceId);

                                                return (
                                                    <li key={index} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                                                        <span className="text-gray-700">
                                                            {service ? service.name : serviceId}
                                                        </span>
                                                        <span className="text-gray-600 font-medium">
                                                            {service ? service.price : ''}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default OrderHistory;
