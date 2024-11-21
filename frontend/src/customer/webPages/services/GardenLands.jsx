import Layout from '../../layout.jsx';
import React, { useState } from 'react';

function GardeningLandscapingServices() {
  const [activeCategory, setActiveCategory] = useState('design');

  const services = {
    design: [
      {
        id: 1,
        name: 'Landscape Design',
        price: '₹15,999',
        description: 'Professional landscape design service to transform your outdoor space into a beautiful and functional area.',
        duration: '3-5 days',
        image: '/api/placeholder/300/200?text=Landscape+Design',
        includes: [
          'Site analysis and assessment',
          '3D visualization of design',
          'Plant selection consultation',
          'Detailed implementation plan'
        ]
      },
      {
        id: 2,
        name: 'Garden Design',
        price: '₹8,999',
        description: 'Custom garden design service focusing on creating beautiful and sustainable garden spaces.',
        duration: '2-3 days',
        image: '/api/placeholder/300/200?text=Garden+Design',
        includes: [
          'Color scheme planning',
          'Seasonal plant selection',
          'Garden layout design',
          'Maintenance guidelines'
        ]
      },
      {
        id: 3,
        name: 'Irrigation Design',
        price: '₹12,999',
        description: 'Expert irrigation system design for efficient water management and plant health.',
        duration: '2-3 days',
        image: '/api/placeholder/300/200?text=Irrigation+Design',
        includes: [
          'Water requirement analysis',
          'Sprinkler layout planning',
          'Drip system design',
          'Control system specification'
        ]
      },
      {
        id: 4,
        name: 'Lawn Renovation',
        price: '₹9,999',
        description: 'Complete lawn makeover service to revitalize your green space.',
        duration: '3-4 days',
        image: '/api/placeholder/300/200?text=Lawn+Renovation',
        includes: [
          'Soil testing and preparation',
          'Grass type selection',
          'Leveling and grading',
          'Initial maintenance plan'
        ]
      }
    ],
    planting: [
      {
        id: 5,
        name: 'Tree Planting',
        price: '₹3,999',
        description: 'Professional tree planting service including selection, placement, and installation.',
        duration: '1-2 days',
        image: '/api/placeholder/300/200?text=Tree+Planting',
        includes: [
          'Tree species consultation',
          'Location assessment',
          'Soil preparation',
          'Post-planting care guide'
        ]
      },
      {
        id: 6,
        name: 'Shrubs and Flower Bed Installation',
        price: '₹7,999',
        description: 'Complete installation service for shrubs and flower beds to enhance your garden.',
        duration: '2-3 days',
        image: '/api/placeholder/300/200?text=Flower+Beds',
        includes: [
          'Bed preparation and edging',
          'Plant arrangement',
          'Mulching service',
          'Care instructions'
        ]
      },
      {
        id: 7,
        name: 'Irrigation System Installation',
        price: '₹24,999',
        description: 'Professional installation of automated irrigation systems for your garden.',
        duration: '3-4 days',
        image: '/api/placeholder/300/200?text=Irrigation+System',
        includes: [
          'System component installation',
          'Timer and control setup',
          'Testing and calibration',
          'Usage training'
        ]
      }
    ]
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Gardening & Landscaping Services
        </h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setActiveCategory('design')}
            className={`px-6 py-2 mr-2 rounded-lg ${
              activeCategory === 'design' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Design Services
          </button>
          <button 
            onClick={() => setActiveCategory('planting')}
            className={`px-6 py-2 rounded-lg ${
              activeCategory === 'planting' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Planting & Installation
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services[activeCategory].map((service) => (
            <div 
              key={service.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                {/* Service Details */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-800">
              🌿 Free garden consultation available
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">
              ✓ Expert horticulturists & landscapers
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">
              💧 Sustainable & eco-friendly practices
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default GardeningLandscapingServices;
