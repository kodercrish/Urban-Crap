import React, { useRef ,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout.jsx';
import aclogo from '../../../assets/ac.jpeg';
import cleaninglogo from '../../../assets/cleaning.jpeg';
import gardeninglogo from '../../../assets/gardening.jpeg';
import paintinglogo from '../../../assets/painting.png';
import plumbinglogo from '../../../assets/plumbing.png';
import pest from '../../../assets/pest.png';
import collage from '../../../assets/clg.png';
import salon from '../../../assets/salon.png';
import spa from '../../../assets/spa.png';  
import bedbug from '../../../assets/bed.png';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {

  const scrollContainerRef = useRef(null);

  const services = [
    { img: aclogo, title: 'AC & Appliance' },
    { img: cleaninglogo, title: 'Full Home Cleaning' },
    { img: bedbug, title: 'Bedbugs Pest Control' },
    { img: paintinglogo, title: 'Full Home Painting' },
    { img: gardeninglogo, title: 'Front & Back Gardening' },
    { img: spa, title: 'Ayurvedic Spa' },   
  ];

  const slideLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Scroll left by 300px
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  // Slide Right Function
  const slideRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Scroll right by 300px
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  const navigate = useNavigate(); // Initialize useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the admin is authenticated
  useEffect(() => {
    const customerToken = localStorage.getItem('customerId'); // Example: storing a token in local storage
    if (!customerToken) {
      navigate("/customer/SignIn"); // Redirect to login if no token is found
    } else {
      setIsAuthenticated(true); // Mark as authenticated
    }
  }, [navigate]);

  // Only render the page if the admin is authenticated
  if (!isAuthenticated) {
    return null; // Optionally display a loading spinner here
  }

  

  return (
    <Layout>
      <div className="customer-home bg-[#eaf0f7] min-h-screen p-4 flex flex-col md:flex-row justify-between items-start">
        {/* Left Section */}
        <div className="w-full md:w-1/2">
          {/* Enlarged Introductory Line */}
          <h1 className="text-[#003366] text-3xl font-bold mb-8">
            Expert services tailored to your home,<br/> just a click away!
          </h1>

         {/* Outer outer Box Surrounding the Services */}
         <div className=" p-2 bg-[#eaf0f7] flex justify-start">

        {/* Outer Box Surrounding the Services */}
          <div className="p-4 bg-white rounded-lg shadow-lg ">

          {/* Box with Introductory Line */}
        <div className="p-4  bg-[#eaf0f7] rounded-lg shadow-lg text-white ">
        <h2 className="text-2xl font-semibold mb-4 transform translate-y-[-10px] text-[#003366]">What are you looking for today?</h2>


        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer flex flex-col">
            <Link to ="/customer/services/ACRepair" > {/* Link to the AC Repair page */}
              <img
                src={aclogo} // Placeholder image
                alt="AC & Appliance Services"
                className="w-22 h-30 object-cover" // Increased image size
              />
              <p className="text-center mt-2  font-bold text-[#003366]">AC & Appliance</p> {/* Text pushed to bottom */}
            </Link>
          </div>


          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer">
            <Link to ="/customer/services/salon"> {/* Link to the salon page */}
              <img
                src={salon} // Placeholder image
                alt="Salon Services"
                className="w-30 h-40 object-cover "
              />
              <p className="text-center mt-2 font-bold text-[#003366]">Salon</p>
              </Link>
          </div>

          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer">
            <Link to ="/customer/services/painting"> 
              <img
                src={paintinglogo} // Placeholder image
                alt="Painting Services"
                className="w-22 h-40 object-cover"
              />
              <p className="text-center mt-2 font-bold text-[#003366]">Painting & Decor</p>
              </Link>
          </div>

          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer">
            <Link to ="/customer/services/cleaningpest">
            <img
              src={pest} // Placeholder image
              alt="Cleaning & Pest Control Services"
              className="w-22 h-40 object-cover"
            />
            <p className="text-center mt-2 font-bold text-[#003366]">Cleaning &<br/> Pest Control</p>
            </Link>
          </div>

          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer">
            <Link to ="/customer/services/epc">
              <img
                src={plumbinglogo} // Placeholder image
                alt="Electrical ,Plumbing & Carpentering Services"
                className="w-22 h-38 object-cover"
              />
              <p className="text-center mt-2 font-bold text-[#003366] text-sm">Electrician,Plumber <br/>& Carpenter</p>
            </Link>
          </div>

          <div className="p-2 bg-white rounded-lg shadow hover:shadow-lg hover:bg-[#66b3e0] transition cursor-pointer">
            <Link to ="/customer/services/gardening">
              <img
                src={gardeninglogo} // Placeholder image
                alt="Gardening Services"
                className="w-22 h-40 object-cover"
              />
              <p className="text-center mt-2 font-bold text-[#003366]">Gardening & Landscaping</p>
              </Link>
          </div>
        </div>
      </div>
      </div>

      </div>

      {/* Ratings and Customers - Left aligned
      <div className="mt-4">
        <h2 className="text-[#1c4e80] text-lg font-medium">1M+ Customers Globally</h2>
        <p className="text-gray-700 text-sm">Rated 4.9/5 by our customers</p>
      </div> */}

          </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Enlarged Collage Placeholder */}
          <div className="w-34 bg-[#eaf0f7] rounded-lg mb-10" style={{ height: '683px' }}>
            <div className="w-90 bg-[#eaf0f7] rounded-lg mb-10 " style={{ height: '682px' }}>
          <img
            src={collage} // Replace with your image path
            alt="Image"
            className="w-full h-full object-cover rounded-lg scale-97 border-b-4 border-white"
          />
            </div>
         </div>
        </div>

      </div>

     {/* New and Noteworthy Section */}
      <div className="bg-white p-6">
        <h2 className="text-[#003366] text-2xl font-bold mb-4">New and Noteworthy</h2>
        <div className="relative">
      {/* Left Slide Button */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#003366] to-[#66b3e0] text-white rounded-full p-3 z-10 shadow-lg hover:scale-110 hover:from-[#00509e] hover:to-[#69c3f0] transition-all duration-300"
      >
        &lt;
      </button>


          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-scroll hide-scrollbar "
            //className="flex space-x-4 overflow-x-scroll hide-scrollbar transition-transform"
            // style={{
            //   transform: `translateX(-${scrollPosition}px)`, // Sliding effect
            // }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-[#eaf0f7] p-4 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-20 h-20 object-cover rounded-half mb-1  "
                />
                <h3 className="text-lg font-semibold text-[#003366]">{service.title}</h3>
              </div>
            ))}
          </div>

          {/* Right Slide Button */}
          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-[#003366] to-[#66b3e0] text-white rounded-full p-3 z-10 shadow-lg hover:scale-110 hover:from-[#00509e] hover:to-[#69c3f0] transition-all duration-300"
          >
            &gt;
          </button>

        </div>
        {/* Custom CSS for hiding scrollbar */}
        <style>
          {`
            .hide-scrollbar {
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none; /* IE 10+ */
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Edge */
            }
          `}
        </style>  
        
      </div>


    </Layout>
  );
}




export default CustomerHome;
