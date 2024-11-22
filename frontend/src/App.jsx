import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './authentication/login.jsx';

import AdminSignIn from './admin/webPages/signIn/page.jsx';
import CustomerSignIn from './customer/webPages/signIn/page.jsx';
import AgentSignIn from './serviceAgent/webPages/signIn/page.jsx';

import CustomerSignUp from './customer/webPages/signUp/page.jsx';

import AdminHome from "./admin/webPages/home/page.jsx";
import AdminProfile from "./admin/webPages/profile/page.jsx";

import AgentHome from "./serviceAgent/webPages/home/page.jsx";
import AgentProfile from "./serviceAgent/webPages/profile/page.jsx";

import CustomerHome from "./customer/webPages/home/page.jsx";
import CustomerProfile from "./customer/webPages/profile/page.jsx";
import CustomerShoppingCart from "./customer/webPages/cart/page.jsx";
import OrderHistory from './customer/webPages/orderHistory/page.jsx';


import ACRepairPage from './customer/webPages/services/ACRepair.jsx';
import CleaningPestPage from './customer/webPages/services/CleanPest.jsx';
import EPCPage from './customer/webPages/services/epc.jsx';
import  PaintingPage from './customer/webPages/services/paintdecor.jsx';
import SalonPage from './customer/webPages/services/Salon.jsx';
import GardeningPage from './customer/webPages/services/GardenLands.jsx';


import AboutUs from './customer/webPages/aboutUs/page.jsx';



const App = () => {
  return (
      <Router>
          <Routes>
              {/* Initial Login Selection Page */}
              <Route path="/" element={<Login />} />

              {/* Separate Sign-In Pages for Each User Type */}
              <Route path="/customer/SignIn" element={<CustomerSignIn />} />
              <Route path="/agent/SignIn" element={<AgentSignIn />} />
              <Route path="/admin/SignIn" element={<AdminSignIn />} />

              {/* Customer Sign-Up Page*/}
              <Route path="/customer/SignUp" element={<CustomerSignUp />} />

              {/* Home ,Order History and Profile Pages for Each User Type */}
              <Route path="/customer/home" element={<CustomerHome />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />    
              <Route path="/customer/order-history" element={<OrderHistory />} />       

              <Route path="/agent/home" element={<AgentHome />} />
              <Route path="/agent/profile" element={<AgentProfile />} />

              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/profile" element={<AdminProfile />} />

              {/*Customer Service Pages*/}
              <Route path="/customer/services/ACRepair" element={<ACRepairPage />} />
              <Route path="/customer/services/cleaningpest" element={<CleaningPestPage />} />
              <Route path="/customer/services/epc" element={<EPCPage />} />
              <Route path="/customer/services/painting" element={<PaintingPage />} />
              <Route path="/customer/services/salon" element={<SalonPage />} />
              <Route path="/customer/services/gardening" element={<GardeningPage />} />

              {/*Customer Shopping Cart*/}
              <Route path="/customer/cart"  element={<CustomerShoppingCart />} />



              {/*About Us*/}
             <Route path="/about-us"  element={<AboutUs />} />


          </Routes>
      </Router>
  );
};

export default App;
