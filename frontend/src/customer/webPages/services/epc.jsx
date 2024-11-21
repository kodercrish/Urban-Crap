import Layout from '../../layout.jsx';
import React, { useState } from 'react';
function EPCServices() {
  const [activeCategory, setActiveCategory] = useState('repairs');

  const services = {
    repairs: [
      {
        id: 1,
        category: 'Electrician',
        name: 'Switch & Socket Repair',
        price: '₹199',
        description: 'Professional repair and replacement of faulty switches and sockets.',
        image: '/api/placeholder/300/200?text=Switch+Repair'
      },
      {
        id: 2,
        category: 'Electrician',
        name: 'Fan Repair',
        price: '₹299',
        description: 'Complete fan servicing, repair, and maintenance.',
        image: '/api/placeholder/300/200?text=Fan+Repair'
      },
      {
        id: 3,
        category: 'Electrician',
        name: 'Wall/Ceiling Light',
        price: '₹249',
        description: 'Replacement and repair of wall or ceiling light fixtures.',
        image: '/api/placeholder/300/200?text=Light+Repair'
      },
      {
        id: 4,
        category: 'Carpenter',
        name: 'Cupboard & Drawer',
        price: '₹299',
        description: 'Repair of cupboards, drawers, and cabinet hardware.',
        image: '/api/placeholder/300/200?text=Cupboard+Repair'
      },
      {
        id: 5,
        category: 'Carpenter',
        name: 'Door Repair',
        price: '₹349',
        description: 'Comprehensive door repair and alignment services.',
        image: '/api/placeholder/300/200?text=Door+Repair'
      },
      {
        id: 6,
        category: 'Carpenter',
        name: 'Furniture Repair',
        price: '₹399',
        description: 'General furniture repair and restoration services.',
        image: '/api/placeholder/300/200?text=Furniture+Repair'
      }
    ],
    installations: [
      {
        id: 7,
        category: 'Electrician',
        name: 'Fan Installation',
        price: '₹399',
        description: 'Professional ceiling fan installation with wiring.',
        image: '/api/placeholder/300/200?text=Fan+Installation'
      },
      {
        id: 8,
        category: 'Electrician',
        name: 'Geyser Installation',
        price: '₹599',
        description: 'Complete geyser installation with safety checks.',
        image: '/api/placeholder/300/200?text=Geyser'
      },
      {
        id: 9,
        category: 'Electrician',
        name: 'Wiring',
        price: '₹799',
        description: 'New wiring installation and existing wiring updates.',
        image: '/api/placeholder/300/200?text=Wiring'
      },
      
     
      {
        id: 10,
        category: 'Carpenter',
        name: 'Curtain Rod Installation',
        price: '₹299',
        description: 'Secure installation of curtain rods and brackets.',
        image: '/api/placeholder/300/200?text=Curtain+Rod'
      },
     
      {
        id: 11,
        category: 'Carpenter',
        name: 'Bathroom Accessories',
        price: '₹249',
        description: 'Installation of bathroom holders and hangers.',
        image: '/api/placeholder/300/200?text=Bathroom+Accessories'
      },
      {
        id: 12,
        category: 'Carpenter',
        name: 'Door Lock Installation',
        price: '₹349',
        description: 'Professional door lock and handle installation.',
        image: '/api/placeholder/300/200?text=Door+Lock'
      },
      
    ]
  };

  const handleFilter = (category) => {
    return services[activeCategory].filter(service => service.category === category);
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          EPC Services
        </h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setActiveCategory('repairs')}
            className={`px-4 py-2 mr-2 rounded-lg ${
              activeCategory === 'repairs' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Repairs
          </button>
          <button 
            onClick={() => setActiveCategory('installations')}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'installations' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Installations
          </button>
        </div>

        {/* Subcategory Sections */}
        <div className="space-y-8">
          {/* Electrician Services */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Electrician Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {handleFilter('Electrician').map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-bold">{service.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carpenter Services */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Carpenter Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {handleFilter('Carpenter').map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-bold">{service.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Home Service Note */}
<div className="mt-6 text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
  <p className="text-blue-800 font-semibold">
    🏠 Professional Home Services Available
  </p>
</div>

      </div>
    </div>
    </Layout>
  );
}

export default EPCServices;

