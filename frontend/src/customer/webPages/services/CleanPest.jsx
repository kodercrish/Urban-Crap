import React, { useState, useEffect } from 'react';
import Layout from '../../layout.jsx'
import { useNavigate } from 'react-router-dom';
import { ServicesList } from '../../../customer/components/ServicesList';

function CleaningPestControlPage() {
  const [activeCategory, setActiveCategory] = useState('cleaning');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState(new Set());
  const customerToken = localStorage.getItem('customerId');

  useEffect(() => {
    if (!customerToken) {
      navigate("/customer/SignIn");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, customerToken]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const customerId = localStorage.getItem('customerId');
      try {
        const response = await fetch(`http://localhost:8080/api/getCartItems/${customerId}`);
        const data = await response.json();
        setCartItems(new Set(data.cartItems));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

  const addServiceToCart = async (serviceId) => {
    const customerId = localStorage.getItem('customerId');
    try {
      const response = await fetch('http://localhost:8080/api/addToCart', {
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
      setCartItems(prev => new Set([...prev, serviceId]));
    } catch (error) {
      alert("Error");
    }
  }

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
      setCartItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(serviceId);
        return newSet;
      });
    } catch (error) {
      alert("Error");
    }
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Cleaning & Pest Control Services
          </h1>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveCategory('cleaning')}
              className={`px-6 py-2 mr-2 rounded-lg ${activeCategory === 'cleaning' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Cleaning Services
            </button>
            <button
              onClick={() => setActiveCategory('pestControl')}
              className={`px-6 py-2 rounded-lg ${activeCategory === 'pestControl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pest Control
            </button>
          </div>

          <ServicesList
            category={activeCategory}
            onBookService={addServiceToCart}
            onRemoveService={removeFromCart}
            cartItems={cartItems}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CleaningPestControlPage;