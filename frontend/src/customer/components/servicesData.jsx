import acImage from "../../assets/Website_Images/AC Repair/Home_Appliances/ac.jpg";

export const services = {
    appliances: [
      { 
        id: "ACA1", 
        name: 'AC Repair & Service', 
        price: '₹499', 
        description: 'Complete AC maintenance for all brands and models, ensuring optimal cooling performance.',
        image: acImage,
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACA2", 
        name: 'Refrigerator Repair', 
        price: '₹399', 
        description: 'Expert diagnosis and repair for all refrigerator types and brands.',
        image: '/api/placeholder/300/200?text=Refrigerator+Repair',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACA3", 
        name: 'Washing Machine Service', 
        price: '₹349', 
        description: 'Comprehensive repair and maintenance for both front and top-loading machines.',
        image: '/api/placeholder/300/200?text=Washing+Machine',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACA4", 
        name: 'Microwave Repair', 
        price: '₹299', 
        description: 'Quick and reliable repair for all microwave oven models.',
        image: '/api/placeholder/300/200?text=Microwave+Repair',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACA5", 
        name: 'Gas Stove Service', 
        price: '₹249', 
        description: 'Professional cleaning and maintenance for gas stoves.',
        image: '/api/placeholder/300/200?text=Gas+Stove',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACA6", 
        name: 'Water Purifier Service', 
        price: '₹379', 
        description: 'Thorough cleaning and repair of kitchen chimneys.',
        image: '/api/placeholder/300/200?text=Chimney+Repair',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },

    ],
    electrical: [
      { 
        id: "ACE1", 
        name: 'Electrical Wiring', 
        price: '₹599', 
        description: 'Professional electrical wiring and maintenance services.',
        image: '/api/placeholder/300/200?text=Electrical+Wiring',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACE2", 
        name: 'Switchboard Repair', 
        price: '₹249', 
        description: 'Expert repair and replacement of switchboards and electrical outlets.',
        image: '/api/placeholder/300/200?text=Switchboard+Repair',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACE3", 
        name: 'Fan & Fixture Service', 
        price: '₹299', 
        description: 'Repair and installation of fans, lights, and electrical fixtures.',
        image: '/api/placeholder/300/200?text=Fan+Repair',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id: "ACE4", 
        name: 'Generator Maintenance', 
        price: '₹499', 
        description: 'Comprehensive generator servicing and repair.',
        image: '/api/placeholder/300/200?text=Generator+Service',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      },
      { 
        id:" ACE5", 
        name: 'UPS & Inverter Service', 
        price: '₹349', 
        description: 'Battery and system maintenance for UPS and inverters.',
        image: '/api/placeholder/300/200?text=UPS+Service',
        duration: '1-2 hours',
        includes: [
          'xyz'
        ]
      }
    ],
    ////////////////////////////////
    cleaning: [
      {
        id: 1,
        name: 'Bathroom Cleaning',
        price: '₹299',
        description: 'Comprehensive bathroom deep cleaning service.',
        image: '/api/placeholder/300/200?text=Bathroom+Cleaning',
        duration: '1-2 hours',
        includes: [
          'Tile & grout scrubbing',
          'Sanitization of fixtures',
          'Mirror and glass cleaning',
          'Floor mopping',
        ]
      },
      {
        id: 2,
        name: 'Kitchen Cleaning',
        price: '₹499',
        description: 'Complete kitchen deep cleaning and degreasing.',
        image: '/api/placeholder/300/200?text=Kitchen+Cleaning',
        duration: '2-3 hours',
        includes: [
          'Appliance exterior cleaning',
          'Countertop sanitization',
          'Cabinet and drawer cleaning',
          'Floor and wall cleaning',
        ]
      },
      {
        id: 3,
        name: 'Full Home Cleaning',
        price: '₹1299',
        description: 'Comprehensive cleaning of entire living space.',
        image: '/api/placeholder/300/200?text=Full+Home+Cleaning',
        duration: '3-4 hours',
        includes: [
          'Room-by-room deep cleaning',
          'Furniture dusting',
          'Floor mopping and vacuuming',
          'Window and glass cleaning',
        ]
      },
    ],
    pestControl: [
      {
        id: 4,
        name: 'General Pest Control',
        price: '₹599',
        description: 'Comprehensive treatment for cockroaches, ants, and common pests.',
        image: '/api/placeholder/300/200?text=General+Pest+Control',
        duration: '1-2 hours',
        includes: [
          'Thorough pest inspection',
          'Targeted chemical treatment',
          'Entry point sealing',
          'Follow-up consultation',
        ]
      },
      {
        id: 5,
        name: 'Termite Control',
        price: '₹1499',
        description: 'Advanced termite prevention and eradication service.',
        image: '/api/placeholder/300/200?text=Termite+Control',
        duration: '2-3 hours',
        includes: [
          'Comprehensive termite assessment',
          'Chemical barrier treatment',
          'Wood treatment',
          'Preventive recommendations',
        ]
      },
      {
        id: 6,
        name: 'Bed Bugs Control',
        price: '₹899',
        description: 'Specialized bed bug elimination treatment.',
        image: '/api/placeholder/300/200?text=Bed+Bugs+Control',
        duration: '2-3 hours',
        includes: [
          'Detailed bed bug inspection',
          'Heat treatment',
          'Chemical application',
          'Follow-up treatment check',
        ]
      },
    ],
    ////////////////////////////////
    repairs: [
      {
        id: 1,
        category: 'Electrician',
        name: 'Switch & Socket Repair',
        price: '₹199',
        description: 'Professional repair and replacement of faulty switches and sockets.',
        image: '/api/placeholder/300/200?text=Switch+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 2,
        category: 'Electrician',
        name: 'Fan Repair',
        price: '₹299',
        description: 'Complete fan servicing, repair, and maintenance.',
        image: '/api/placeholder/300/200?text=Fan+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 3,
        category: 'Electrician',
        name: 'Wall/Ceiling Light',
        price: '₹249',
        description: 'Replacement and repair of wall or ceiling light fixtures.',
        image: '/api/placeholder/300/200?text=Light+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 4,
        category: 'Carpenter',
        name: 'Cupboard & Drawer',
        price: '₹299',
        description: 'Repair of cupboards, drawers, and cabinet hardware.',
        image: '/api/placeholder/300/200?text=Cupboard+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 5,
        category: 'Carpenter',
        name: 'Door Repair',
        price: '₹349',
        description: 'Comprehensive door repair and alignment services.',
        image: '/api/placeholder/300/200?text=Door+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 6,
        category: 'Carpenter',
        name: 'Furniture Repair',
        price: '₹399',
        description: 'General furniture repair and restoration services.',
        image: '/api/placeholder/300/200?text=Furniture+Repair',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      }
    ],
    installations: [
      {
        id: 7,
        category: 'Electrician',
        name: 'Fan Installation',
        price: '₹399',
        description: 'Professional ceiling fan installation with wiring.',
        image: '/api/placeholder/300/200?text=Fan+Installation',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 8,
        category: 'Electrician',
        name: 'Geyser Installation',
        price: '₹599',
        description: 'Complete geyser installation with safety checks.',
        image: '/api/placeholder/300/200?text=Geyser',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 9,
        category: 'Electrician',
        name: 'Wiring',
        price: '₹799',
        description: 'New wiring installation and existing wiring updates.',
        image: '/api/placeholder/300/200?text=Wiring',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      
     
      {
        id: 10,
        category: 'Carpenter',
        name: 'Curtain Rod Installation',
        price: '₹299',
        description: 'Secure installation of curtain rods and brackets.',
        image: '/api/placeholder/300/200?text=Curtain+Rod',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
     
      {
        id: 11,
        category: 'Carpenter',
        name: 'Bathroom Accessories',
        price: '₹249',
        description: 'Installation of bathroom holders and hangers.',
        image: '/api/placeholder/300/200?text=Bathroom+Accessories',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
      {
        id: 12,
        category: 'Carpenter',
        name: 'Door Lock Installation',
        price: '₹349',
        description: 'Professional door lock and handle installation.',
        image: '/api/placeholder/300/200?text=Door+Lock',
        duration: '2-3 hours',
        includes: [
          'abc'
        ]
      },
    ],
    ////////////////////////////////
    gardening: [
      {
        id: 1,
        name: 'Landscape Design',
        price: '₹15,999',
        description: 'Professional landscape design service to transform your outdoor space into a beautiful and functional area.',
        image: '/api/placeholder/300/200?text=Landscape+Design',
        duration: '3-5 days',
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
        image: '/api/placeholder/300/200?text=Garden+Design',
        duration: '2-3 days',
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
        image: '/api/placeholder/300/200?text=Irrigation+Design',
        duration: '2-3 days',
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
        image: '/api/placeholder/300/200?text=Lawn+Renovation',
        duration: '3-4 days',
        includes: [
          'Soil testing and preparation',
          'Grass type selection',
          'Leveling and grading',
          'Initial maintenance plan'
        ]
      }
    ],
    landscaping: [
      {
        id: 5,
        name: 'Tree Planting',
        price: '₹3,999',
        description: 'Professional tree planting service including selection, placement, and installation.',
        image: '/api/placeholder/300/200?text=Tree+Planting',
        duration: '1-2 days',
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
        image: '/api/placeholder/300/200?text=Flower+Beds',
        duration: '2-3 days',
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
        image: '/api/placeholder/300/200?text=Irrigation+System',
        duration: '3-4 days',
        includes: [
          'System component installation',
          'Timer and control setup',
          'Testing and calibration',
          'Usage training'
        ]
      }
    ],
    ////////////////////////////////
    
  };