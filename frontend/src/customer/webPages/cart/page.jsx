import { services } from '../../components/servicesData.jsx';
import { ServiceCard } from '../../components/ServiceCard';
import Layout from '../../layout.jsx';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const locations = [
        "Electronic City",
        "Bommasandra",
        "Kormangala",
        "Marathahalli",
        "Whitefield",
        "Hebbal",
        "Kengeri",
        "Yelahanka",
        "Nagawara",
        "Doddaballapur",
        "Kundalahalli",
        "Kadugodi",
        "Jayanagar",
        "K R Puram",
        "Majestic",
        "Rajarajeshwari Nagar",
        "M G Road",
        "Mysore Road",
        "Vijaynagar",
        "Peenya",
        "Attiguppe",
        "Kengeri Signal",
        "K R Pet Signal",
        "RR Nagar",
        "Attibele",
        "Hoskote",
        "HSR Layout"
    ];

    // Check if the admin is authenticated
    useEffect(() => {
        const customerToken = localStorage.getItem('customerId');
        if (!customerToken) {
            navigate("/customer/SignIn");   // Redirect to login if no token is found
        } else {
            setIsAuthenticated(true);   // Mark as authenticated
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

    const handleCheckoutClick = () => {
        setShowLocationPopup(true);
    };

    const proceedToCheckout = async () => {
        if (!selectedLocation) {
            alert("Please select a location");
            return;
        }

        const customerId = localStorage.getItem('customerId');
        const totalprice = cartItems.reduce((total, item) => {
            const price = Number(item.price.replace('₹', ''))
            return total + price
        }, 0);

        try {
            const response = await fetch('http://localhost:8080/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerId: parseInt(customerId),
                    totalprice: totalprice,
                    location: selectedLocation
                })
            });

            const data = await response.json();
            if (data.message === "SUCCESSFULL ADDED") {
                setShowLocationPopup(false);
                navigate('/customer/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert("Checkout failed. Please try again.");
        }
    };

    // JSX for the location popup
    const LocationPopup = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h2 className="text-xl font-bold text-[#1c4e80] mb-4">Select Your Location</h2>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowLocationPopup(false)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={proceedToCheckout}
                        className="px-4 py-2 bg-[#1c4e80] text-white rounded hover:bg-[#153a61]"
                    >
                        Confirm Checkout
                    </button>
                </div>
            </div>
        </div>
    );


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
                                        onClick={handleCheckoutClick}
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
            {/* Popup before the closing Layout tag: */}
            {showLocationPopup && <LocationPopup />}
        </Layout>
    );
};
export default CustomerShoppingCart;
