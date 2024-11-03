import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#eaf0f7]">
      <div className="p-8 rounded-lg shadow-lg bg-[#1c4e80] text-center w-72">
        {/* Heading */}
        <h2 style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '21px', fontFamily: 'Copperplate', display: 'block',color:'white' }}>Embarking into</span>
          <span style={{ fontSize: '36px', fontFamily: 'Copperplate', fontWeight: 'bold',color:'white' }}>Urban Crap</span>
        </h2>

        {/* Buttons */}
        <p className="text-white mb-5">Select your login type:</p>

        {/* Customer Button */}
        {/* Customer Button */}
        <div className="mb-2">
        <Link to="/customer/SignIn" className="block">
            <button className="w-full py-2 rounded-md border-2 border-white bg-[#003366] text-white font-bold text-lg hover:bg-[#66b3e0] transition duration-300 hover:shadow-md">
              Customer
            </button>
          </Link>
        </div>

        {/* Agent Button */}
        <div className="mb-2">
        <Link to="/agent/SignIn" className="block">
            <button className="w-full py-2 rounded-md border-2 border-white bg-[#003366] text-white font-bold text-lg hover:bg-[#66b3e0] transition duration-300 hover:shadow-md">
              Agent
            </button>
          </Link>
        </div>

        {/* Admin Button */}
        <div className="mb-2">
        <Link to="/admin/SignIn" className="block">
            <button className="w-full py-2 rounded-md border-2 border-white bg-[#003366] text-white font-bold text-lg hover:bg-[#66b3e0] transition duration-300 hover:shadow-md">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
