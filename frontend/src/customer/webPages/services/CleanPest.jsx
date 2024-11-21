import Layout from '../../layout.jsx';
import React, { useState } from 'react';

function CleaningPestControlPage() {
  const [activeCategory, setActiveCategory] = useState('cleaning');

  const services = {
    cleaning: [
      {
        id: 1,
        name: 'Bathroom Cleaning',
        price: '₹299',
        description: 'Comprehensive bathroom deep cleaning service.',
        duration: '1-2 hours',
        image: '/api/placeholder/300/200?text=Bathroom+Cleaning',
        includes: [
          'Tile & grout scrubbing',
          'Sanitization of fixtures',
          'Mirror and glass cleaning',
          'Floor mopping',
        ],
      },
      {
        id: 2,
        name: 'Kitchen Cleaning',
        price: '₹499',
        description: 'Complete kitchen deep cleaning and degreasing.',
        duration: '2-3 hours',
        image: '/api/placeholder/300/200?text=Kitchen+Cleaning',
        includes: [
          'Appliance exterior cleaning',
          'Countertop sanitization',
          'Cabinet and drawer cleaning',
          'Floor and wall cleaning',
        ],
      },
      {
        id: 3,
        name: 'Full Home Cleaning',
        price: '₹1299',
        description: 'Comprehensive cleaning of entire living space.',
        duration: '3-4 hours',
        image: '/api/placeholder/300/200?text=Full+Home+Cleaning',
        includes: [
          'Room-by-room deep cleaning',
          'Furniture dusting',
          'Floor mopping and vacuuming',
          'Window and glass cleaning',
        ],
      },
    ],
    pestControl: [
      {
        id: 4,
        name: 'General Pest Control',
        price: '₹599',
        description: 'Comprehensive treatment for cockroaches, ants, and common pests.',
        duration: '1-2 hours',
        image: '/api/placeholder/300/200?text=General+Pest+Control',
        includes: [
          'Thorough pest inspection',
          'Targeted chemical treatment',
          'Entry point sealing',
          'Follow-up consultation',
        ],
      },
      {
        id: 5,
        name: 'Termite Control',
        price: '₹1499',
        description: 'Advanced termite prevention and eradication service.',
        duration: '2-3 hours',
        image: '/api/placeholder/300/200?text=Termite+Control',
        includes: [
          'Comprehensive termite assessment',
          'Chemical barrier treatment',
          'Wood treatment',
          'Preventive recommendations',
        ],
      },
      {
        id: 6,
        name: 'Bed Bugs Control',
        price: '₹899',
        description: 'Specialized bed bug elimination treatment.',
        duration: '2-3 hours',
        image: '/api/placeholder/300/200?text=Bed+Bugs+Control',
        includes: [
          'Detailed bed bug inspection',
          'Heat treatment',
          'Chemical application',
          'Follow-up treatment check',
        ],
      },
    ],
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Cleaning & Pest Control Services
          </h1>

          {/* Category Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveCategory('cleaning')}
              className={`px-6 py-2 mr-2 rounded-lg ${
                activeCategory === 'cleaning' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Cleaning Services
            </button>
            <button
              onClick={() => setActiveCategory('pestControl')}
              className={`px-6 py-2 rounded-lg ${
                activeCategory === 'pestControl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pest Control
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services[activeCategory].map((service) => (
              <div
                key={service.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Service Details */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Duration: {service.duration}
                    </div>

                    <div className="text-sm text-gray-500 mt-2">
                      <p className="font-medium mb-1">Includes:</p>
                      <ul className="list-disc pl-5">
                        {service.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-blue-600 font-bold text-xl">{service.price}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Notes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-blue-800">🧼 Professional cleaning with eco-friendly solutions</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">✓ Safe & effective pest elimination techniques</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CleaningPestControlPage;