import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../assets/logo.jpg';

const NavBar = () => {

  const handleLogout = () => {
    // Remove customerId from localStorage
    localStorage.removeItem('customerId');
  };
  
  return (
    <div>
      <header className="bg-[#1c4e80] py-2 sticky top-0 w-full z-10">
        <div className="max-w-full mx-auto px-8">
          <nav className="flex items-center justify-between gap-5">
            {/* Left Section: Logo and Brand Name */}
            <div className="flex items-center gap-5">
              {/* Logo */}
              <div>
                <img src={logo} alt="Logo" className="h-[65px] w-[65px] rounded-full" />
              </div>
              <h1 className="text-[#e8f0e5] font-medium text-xl">Urban Crap</h1>
            </div>

            {/* Right Section: Navigation and Profile */}
            <div className="flex items-center gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-8">
                <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-lg">
                  Services
                </div>
                <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-lg">
                  About Us
                </div>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-5">
                <div className="w-[45px] h-[45px] rounded-full border-2 border-white flex items-center justify-center overflow-hidden mr-2">
                  <Link to="/customer/profile">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png"
                      alt="Profile"
                      className="w-[100px] h-[40px] rounded-full transition duration-300 brightness-53 hover:brightness-50"
                    />
                  </Link>
                </div>
                <Link to ="/customer/SignIn">
                <button
                  onClick={handleLogout} // Attach the handleLogout function
                  className="text-white border border-white px-4 py-1 rounded transition duration-300 hover:bg-[#66b3e0] hover:text-white text-lg"
                >
               
                  Logout
                </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default NavBar;