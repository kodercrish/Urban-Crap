/*import Layout from '../../layout.jsx';

const CustomerShoppingCart = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-[#1c4e80] mb-4">
                    Welcome to Your Shopping Cart!
                </h1>
                <p className="text-lg text-gray-600">
                    Explore and manage the items you've added to your cart.
                </p>
            </div>
        </Layout>
    );
};


export default CustomerShoppingCart;
*/
import Layout from '../../layout.jsx';
import React, { useEffect, useState } from 'react';

const CustomerShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate fetching data from a database
    const fetchCartItems = async () => {
        try {
            // Replace this with your actual API endpoint
            const response = await fetch('/api/cart');
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total price
    const calculateTotal = () =>
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Remove item from cart
    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Fetch cart items on component mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-[#1c4e80] mb-6 text-center">
                        Your Shopping Cart
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading your cart...</p>
                    ) : cartItems.length === 0 ? (
                        <p className="text-center text-gray-600">Your cart is empty!</p>
                    ) : (
                        <div>
                            {/* Cart Items */}
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-[#f9f9f9]"
                                    >
                                        {/* Item Details */}
                                        <div className="flex items-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold text-[#1c4e80]">
                                                    {item.name}
                                                </h2>
                                                <p className="text-gray-600">
                                                    ₹{item.price} x {item.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Total and Checkout */}
                            <div className="mt-6 bg-[#f0f8ff] p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-[#1c4e80]">
                                    Total: ₹{calculateTotal()}
                                </h2>
                                <button
                                    className="bg-[#1c4e80] text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#14506d] transition w-full"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CustomerShoppingCart;
/*
[
    {
        "id": 1,
        "name": "Premium Paint",
        "price": 500,
        "quantity": 2,
        "image": "/path/to/image.jpg"
    },
    {
        "id": 2,
        "name": "Luxury Paint",
        "price": 1000,
        "quantity": 1,
        "image": "/path/to/another-image.jpg"
    }
]
*/

