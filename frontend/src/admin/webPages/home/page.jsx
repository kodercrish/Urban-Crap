import Layout from '../../layout.jsx';
import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [showForm, setShowForm] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skill: "",
    range:""
  });

  const [serviceAgents, setServiceAgents] = useState([]); // State to hold service agent detailsययययययययययययययययय  
  const navigate = useNavigate(); // Initialize useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(false);


   // Check if the admin is authenticated
   useEffect(() => {
    const adminToken = localStorage.getItem("adminId"); // Example: storing a token in local storage
      if (!adminToken) {
        navigate("/admin/SignIn"); // Redirect to login if no token is found
      } else {
        setIsAuthenticated(true); // Mark as authenticated
      }
    }, [navigate]);


  useEffect(() => {
      if (isAuthenticated) {
        fetchServiceAgents();
      }
    }, [isAuthenticated]);

    const fetchServiceAgents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/getAllServiceAgents", {
          method: "POST", // Using POST method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // Empty body for POST
        });
        const data = await response.json();
        if (data.message!=null) {
          setServiceAgents(data.agents);
        } else {
          alert(data.message);

        }
      } catch (error) {
        alert("Error fetching service agents. Please try again.");
      }
    };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Convert skills string to an array
        const skillArray = formData.skill.split(",").map((s) => s.trim());

        const response = await fetch('http://localhost:8080/api/addsa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email, 
                password: formData.password,
                skill: skillArray,
                range: parseInt(formData.range),
            })
        });

      const data = await response.json();
      if(data.agentId===0 || data.agentId===-1){
        alert(data.message);
      }
      else{
        // store the customerId in local storage
        // alert("Service Agent added successfully!");

        // Add the new agent to the state
        setServiceAgents((prevAgents) => [
        ...prevAgents,
        {
          name: formData.name,
          email: formData.email,
          skill: skillArray,
          range: formData.range
        }
      ]);

        navigate('/admin/home');
        setShowForm(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          skill: "",
          range:""
        });
      }
    } catch (error) {
        alert("Registration failed. Please try again.");
    }
  };
  // Only render the page if the admin is authenticated
  if (!isAuthenticated) {
    return null; // Optionally display a loading spinner here
  }

  return (
    <div>
      <Layout>
        <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
          <h1 className="text-[#1c4e80] text-3xl font-bold mb-4">
            Welcome to the Admin Home Page
          </h1>
          <p className="text-gray-700 mb-6">
            Manage and oversee site content with ease.
          </p>

          <div className="mt-6">
        <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">
          Service Agents List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#1c4e80] text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Skills</th>
                <th className="py-3 px-4 text-left">Service Radius</th>
              </tr>
            </thead>
            <tbody>
              {serviceAgents.map((agent, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  <td className="py-3 px-4">{agent.name}</td>
                  <td className="py-3 px-4">{agent.email}</td>
                  <td className="py-3 px-4">
                  {Array.isArray(agent.skill) ? agent.skill.join(", ") : "No skills listed"}
                  </td>
                  <td className="py-3 px-4">{agent.range} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

          {/* Add New Entry Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#1c4e80] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#163b62] transition duration-300"
          >
            Add New Entry
          </button>
        </div>
      </Layout>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg relative slide-down">
            <h2 className="text-2xl font-semibold text-[#1c4e80] mb-4">
              Add New Entry
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.agentname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c4e80] focus:border-transparent outline-none transition"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c4e80] focus:border-transparent outline-none transition"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c4e80] focus:border-transparent outline-none transition"
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="range"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Skills 
                </label>
                <input
                  type="text"
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c4e80] focus:border-transparent outline-none transition"
                  placeholder="e.g. Electrician,Plumber,Carpenter"
                />
              </div>
              <div className="mb-4">
              <label
                htmlFor="range"
                className="block text-gray-700 font-medium mb-2"
              >
                Service Radius (in km)
              </label>
              <input
                type="range"
                id="range"
                name="range"
                min="1"
                max="100"
                step="1"
                value={formData.range}
                onChange={handleInputChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#1c4e80]"
              />
              </div>
              <span className="ml-4 text-gray-700 font-medium">
                {formData.range} km
              </span>
              <div className="flex justify-between">
                <button
                  
                  type="submit"
                  className="bg-[#1c4e80] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#163b62] transition duration-300"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  type="button"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;