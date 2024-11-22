import { services } from '../../components/servicesData.jsx';
import { ServiceCard } from '../../components/ServiceCard';
import Layout from '../../layout.jsx';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchCartItems = async () => {
            const customerId = localStorage.getItem('customerId');
            try {
                const response = await fetch(`http://localhost:8080/api/getCartItems/${customerId}`);
                const data = await response.json();

                // Filter services from servicesData that match cart item IDs
                const cartServices = Object.values(services)
                    .flat()
                    .filter(service => data.cartItems.includes(service.id));

                setCartItems(cartServices);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = async (serviceId) => {
        const customerId = localStorage.getItem('customerId');
        try {
            const response = await fetch('http://localhost:8080/api/removeFromCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: serviceId,
                    customerId: parseInt(customerId),
                })
            });
            const data = await response.json();
            setCartItems(prevItems => prevItems.filter(item => item.id !== serviceId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    //On clicking proceed to checkout what happens
    const proceedToCheckout = async () => {
        const customerId = localStorage.getItem('customerId');
        try {
            const response = await fetch('http://localhost:8080/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId)
                })
            });
            const data = await response.json();
            if (data.message === "SUCCESSFULL ADDED") {
                navigate('/customer/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert("Checkout failed. Please try again.");
        }

        // Only render the page if the admin is authenticated
        if (!isAuthenticated) {
            return null; // Optionally display a loading spinner here
        }
    };


    return (
        <Layout>
            <div className="min-h-screen bg-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-[#1c4e80] mb-6 text-center">
                        Your Shopping Cart
                    </h1>

                    {loading ? (
                        <p className="text-center">Loading cart items...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cartItems.map(service => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        onRemove={removeFromCart}
                                        isInCart={true}
                                    />
                                ))}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-[#1c4e80]">Cart Total</h2>
                                        <p className="text-2xl font-bold text-[#1c4e80]">
                                            ₹{cartItems.reduce((total, item) => {
                                                const price = Number(item.price.replace('₹', ''))
                                                return total + price
                                            }, 0)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={proceedToCheckout}
                                        className="w-full mt-4 bg-[#1c4e80] text-white py-3 rounded-lg hover:bg-[#153a61] transition-colors"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </Layout>
    );
};
export default CustomerShoppingCart;
