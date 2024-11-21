import React, { useState } from 'react';
import Layout from '../../layout.jsx'

import acImage from "../../../assets/Website_Images/AC Repair/Home_Appliances/ac.jpg";
// ./ means bhai
// ../ means baap
// ye comments baadme hata dena, Ok???

function ACApplianceService() {
  const [activeCategory, setActiveCategory] = useState('appliances');

  const services = {
    appliances: [
      { 
        id: 1, 
        name: 'AC Repair & Service', 
        price: '₹499', 
        description: 'Complete AC maintenance for all brands and models, ensuring optimal cooling performance.',
        image: acImage
      },
      { 
        id: 2, 
        name: 'Refrigerator Repair', 
        price: '₹399', 
        description: 'Expert diagnosis and repair for all refrigerator types and brands.',
        image: '/api/placeholder/300/200?text=Refrigerator+Repair'
      },
      { 
        id: 3, 
        name: 'Washing Machine Service', 
        price: '₹349', 
        description: 'Comprehensive repair and maintenance for both front and top-loading machines.',
        image: '/api/placeholder/300/200?text=Washing+Machine'
      },
      { 
        id: 4, 
        name: 'Microwave Repair', 
        price: '₹299', 
        description: 'Quick and reliable repair for all microwave oven models.',
        image: '/api/placeholder/300/200?text=Microwave+Repair'
      },
      { 
        id: 5, 
        name: 'Gas Stove Service', 
        price: '₹249', 
        description: 'Professional cleaning and maintenance for gas stoves.',
        image: '/api/placeholder/300/200?text=Gas+Stove'
      },
      { 
        id: 6, 
        name: 'Water Purifier Service', 
        price: '₹379', 
        description: 'Thorough cleaning and repair of kitchen chimneys.',
        image: '/api/placeholder/300/200?text=Chimney+Repair'
      },

    ],
    electrical: [
      { 
        id: 1, 
        name: 'Electrical Wiring', 
        price: '₹599', 
        description: 'Professional electrical wiring and maintenance services.',
        image: '/api/placeholder/300/200?text=Electrical+Wiring'
      },
      { 
        id: 2, 
        name: 'Switchboard Repair', 
        price: '₹249', 
        description: 'Expert repair and replacement of switchboards and electrical outlets.',
        image: '/api/placeholder/300/200?text=Switchboard+Repair'
      },
      { 
        id: 3, 
        name: 'Fan & Fixture Service', 
        price: '₹299', 
        description: 'Repair and installation of fans, lights, and electrical fixtures.',
        image: '/api/placeholder/300/200?text=Fan+Repair'
      },
      { 
        id: 4, 
        name: 'Generator Maintenance', 
        price: '₹499', 
        description: 'Comprehensive generator servicing and repair.',
        image: '/api/placeholder/300/200?text=Generator+Service'
      },
      { 
        id: 5, 
        name: 'UPS & Inverter Service', 
        price: '₹349', 
        description: 'Battery and system maintenance for UPS and inverters.',
        image: '/api/placeholder/300/200?text=UPS+Service'
      }
    ]
  };

  return (
    <Layout>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Home Appliance & Electrical Services
        </h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setActiveCategory('appliances')}
            className={`px-4 py-2 mr-2 rounded-lg ${
              activeCategory === 'appliances' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Home Appliances
          </button>
          <button 
            onClick={() => setActiveCategory('electrical')}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'electrical' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Electrical Services
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[700px] overflow-y-auto">
          {services[activeCategory].map((service) => (
            <div 
              key={service.id} 
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col"
            >
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2 flex-grow">{service.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-blue-600 font-bold">{service.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
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

export default ACApplianceService;