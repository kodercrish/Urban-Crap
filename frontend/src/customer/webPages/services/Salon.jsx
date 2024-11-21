import React, { useState } from 'react';
import Layout from '../../layout.jsx';
function SalonPage() {
  const [activeCategory, setActiveCategory] = useState('men');

  const services = {
    men: [
      { 
        id: 1, 
        name: 'Haircut', 
        price: '₹299', 
        description: 'Professional styling and precise cutting to match your desired look.',
        image: '/api/placeholder/300/200?text=Haircut'
      },
      { 
        id: 2, 
        name: 'Beard Trimming & Styling', 
        price: '₹199', 
        description: 'Perfectly sculpted beard with expert shaping and grooming.',
        image: '/api/placeholder/300/200?text=Beard+Styling'
      },
      { 
        id: 3, 
        name: 'Massage', 
        price: '₹499', 
        description: 'Relaxing full-body massage to release tension and rejuvenate.',
        image: '/api/placeholder/300/200?text=Massage'
      },
      { 
        id: 4, 
        name: 'Pedicure', 
        price: '₹349', 
        description: 'Complete foot care with cleaning, exfoliation, and nail treatment.',
        image: '/api/placeholder/300/200?text=Pedicure'
      },
      { 
        id: 5, 
        name: 'Hair Color', 
        price: '₹699', 
        description: 'Professional hair coloring with premium, long-lasting dyes.',
        image: '/api/placeholder/300/200?text=Hair+Color'
      },
      { 
        id: 6, 
        name: 'Detan', 
        price: '₹399', 
        description: 'Skin brightening treatment to remove tan and even out skin tone.',
        image: '/api/placeholder/300/200?text=Detan'
      },
      { 
        id: 7, 
        name: 'Facial & Cleanup', 
        price: '₹599', 
        description: 'Deep cleansing facial to remove impurities and refresh skin.',
        image: '/api/placeholder/300/200?text=Facial'
      }
    ],
    women: [
      { 
        id: 1, 
        name: 'Makeup & Styling', 
        price: '₹799', 
        description: 'Professional makeup application for any occasion or photoshoot.',
        image: '/api/placeholder/300/200?text=Makeup+Styling'
      },
      { 
        id: 2, 
        name: 'Hair Styling', 
        price: '₹399', 
        description: 'Elegant hairstyling for various looks and events.',
        image: '/api/placeholder/300/200?text=Hair+Styling'
      },
      { 
        id: 3, 
        name: 'Massage', 
        price: '₹549', 
        description: 'Soothing massage to relax and revitalize body and mind.',
        image: '/api/placeholder/300/200?text=Massage'
      },
      { 
        id: 4, 
        name: 'Waxing', 
        price: '₹299', 
        description: 'Smooth, long-lasting hair removal for entire body.',
        image: '/api/placeholder/300/200?text=Waxing'
      },
      { 
        id: 5, 
        name: 'Facial', 
        price: '₹499', 
        description: 'Customized facial treatment for glowing, healthy skin.',
        image: '/api/placeholder/300/200?text=Facial'
      },
      { 
        id: 6, 
        name: 'Cleanup', 
        price: '₹349', 
        description: 'Thorough skin cleansing and pore treatment.',
        image: '/api/placeholder/300/200?text=Cleanup'
      },
      { 
        id: 7, 
        name: 'Pedicure', 
        price: '₹399', 
        description: 'Complete foot care with nail polish and massage.',
        image: '/api/placeholder/300/200?text=Pedicure'
      },
      { 
        id: 8, 
        name: 'Manicure', 
        price: '₹249', 
        description: 'Comprehensive hand and nail care with styling.',
        image: '/api/placeholder/300/200?text=Manicure'
      },
      { 
        id: 9, 
        name: 'Threading & Face Wax', 
        price: '₹199', 
        description: 'Precise facial hair removal and shaping.',
        image: '/api/placeholder/300/200?text=Threading'
      },
      { 
        id: 10, 
        name: 'Bleach & Detan', 
        price: '₹449', 
        description: 'Skin brightening and tan removal treatment.',
        image: '/api/placeholder/300/200?text=Bleach+Detan'
      }
    ]
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Salon Services
        </h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setActiveCategory('men')}
            className={`px-4 py-2 mr-2 rounded-lg ${
              activeCategory === 'men' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Men's Services
          </button>
          <button 
            onClick={() => setActiveCategory('women')}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'women' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Women's Services
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
            🏠 All Services Available for Home Delivery
          </p>
        </div>
      </div>

      
    </div>
    </Layout >
  );
}

export default SalonPage;
