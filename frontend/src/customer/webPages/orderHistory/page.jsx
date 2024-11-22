import React, { useEffect, useState } from 'react';
import Layout from '../../layout.jsx';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]); // State to store orders
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the admin is authenticated
    useEffect(() => {
        const customerToken = localStorage.getItem('customerId'); // Example: storing a token in local storage
        if (!customerToken) {
            navigate("/customer/SignIn"); // Redirect to login if no token is found
        } else {
            setIsAuthenticated(true); // Mark as authenticated
        };
    }, [navigate]);

    // Fetch orders on component load
    useEffect(() => {
        const fetchOrders = async () => {
            const customerId = localStorage.getItem('customerId'); // Get customer ID
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
                setOrders(data); // Set orders in state

            } catch (error) {
                console.error('Error removing item from cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Only render the page if the admin is authenticated
    if (!isAuthenticated) {
        return null; // Optionally display a loading spinner here
    }

    return (
        <Layout>
            <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-16 px-8">
                <h1 className="text-2xl font-bold mb-8">Your Order History</h1>

                {loading && <p>Loading orders...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <ul className="space-y-4">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <li
                                    key={order.id}
                                    className="bg-white shadow-md p-4 rounded-md"
                                >
                                    <h2 className="font-bold text-lg">
                                        Order ID: {order.id}
                                    </h2>
                                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p>Total Amount: ₹{order.totalAmount}</p>
                                    <ul className="mt-4">
                                        <h3 className="font-semibold">Services:</h3>
                                        {order.services.map((service, index) => (
                                            <li key={index} className="ml-4 list-disc">
                                                {service.name} - ₹{service.price}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default OrderHistory;




