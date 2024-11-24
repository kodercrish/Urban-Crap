import Layout from '../../layout.jsx';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skill: "",
    range: "",
    location: ""
  });
  
  // Add new state for search and location filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  const [serviceAgents, setServiceAgents] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // ... keep other existing state and constants ...
  const availableSkills = [
    "Electrician",
    "Carpenter",
    "Painter",
    "Technician",
    "Cleaning",
    "Pest Controller",
    "Gardening"
  ]
  // Add new function to filter service agents
  const getFilteredAgents = () => {
    return serviceAgents.filter(agent => {
      const matchesSearch = 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(agent.skill) && agent.skill.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      const matchesLocation = !selectedLocation || agent.location === selectedLocation;
      
      return matchesSearch && matchesLocation;
    });
  };

  // ... keep existing useEffect hooks and other functions ...
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
    if (data.message != null) {
      setServiceAgents(data.agents);
    } else {
      alert(data.message);

    }
  } catch (error) {
    alert("Error fetching service agents. Please try again.");
  }
};

const handleSkillChange = (skill) => {
  setSelectedSkills(prev => {
    const newSkills = prev.includes(skill)
      ? prev.filter(s => s !== skill)
      : [...prev, skill];

    setFormData({
      ...formData,
      skill: newSkills.join(',')
    });

    return newSkills;
  });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Convert skills string to array and ensure all fields are present
    const skillArray = formData.skill.split(",").map(s => s.trim());

    const response = await fetch('http://localhost:8080/api/addsa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skill: selectedSkills,
        range: parseInt(formData.range),
        location: formData.location
      })
    });

    const data = await response.json();
    if (data.message === "Service agent added successfully") {
      // Add the new agent to the state
      setServiceAgents(prevAgents => [...prevAgents, {
        name: formData.name,
        email: formData.email,
        skill: selectedSkills,
        range: formData.range,
        location: formData.location
      }]);

      // Clear form and close modal
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        skill: "",
        range: "",
        location: ""
      });
      setSelectedSkills([]);
      // Refresh the list
      fetchServiceAgents();
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Registration failed. Please try again.");
  }
};
// Only render the page if the admin is authenticated
if (!isAuthenticated) {
  return null; // Optionally display a loading spinner here
}
  // Add handlers for search and location
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div>
      <Layout>
        <div className="admin-home bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen p-6">
          {/* Keep existing header section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h1 className="text-blue-800 text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome to the Admin Home Page
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Manage and oversee site content with ease. Monitor service agents, track performance, and maintain service quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-800 font-semibold mb-2">Total Agents</h3>
                <p className="text-3xl font-bold text-blue-600">{serviceAgents.length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-purple-800 font-semibold mb-2">Total Locations</h3>
                <p className="text-3xl font-bold text-purple-600">27</p>
              </div>
            </div>
          </div>

          {/* Service Agents Management Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">
                Service Agents Management
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Agent
              </button>
            </div>

            {/* Updated search and filter section */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, email, or skills..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select 
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Location</option>
                <option value="Electronic City">Electronic City</option>
                <option value="Bommasandra">Bommasandra</option>
                <option value="Kormangala">Kormangala</option>
                <option value="Marathahalli">Marathahalli</option>
                <option value="Whitefield">Whitefield</option>
                <option value="Hebbal">Hebbal</option>
                <option value="Kengeri">Kengeri</option>
                <option value="Yelahanka">Yelahanka</option>
                <option value="Nagawara">Nagawara</option>
                <option value="Doddaballapur">Doddaballapur</option>
                <option value="Kundalahalli">Kundalahalli</option>
                <option value="Kadugodi">Kadugodi</option>
                <option value="Jayanagar">Jayanagar</option>
                <option value="K R Puram">K R Puram</option>
                <option value="Majestic">Majestic</option>
                <option value="Rajarajeshwari Nagar">Rajarajeshwari Nagar</option>
                <option value="M G Road">M G Road</option>
                <option value="Mysore Road">Mysore Road</option>
                <option value="Vijaynagar">Vijaynagar</option>
                <option value="Peenya">Peenya</option>
                <option value="Attiguppe">Attiguppe</option>
                <option value="Kengeri Signal">Kengeri Signal</option>
                <option value="K R Pet Signal">K R Pet Signal</option>
                <option value="RR Nagar">RR Nagar</option>
                <option value="Attibele">Attibele</option>
                <option value="Hoskote">Hoskote</option>
                <option value="HSR Layout">HSR Layout</option>
              </select>
            </div>

            {/* Updated table to use filtered agents */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <th className="py-4 px-6 text-left">Name</th>
                    <th className="py-4 px-6 text-left">Email</th>
                    <th className="py-4 px-6 text-left">Skills</th>
                    <th className="py-4 px-6 text-left">Service Radius</th>
                    <th className="py-4 px-6 text-left">Location</th>
                    <th className="py-4 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredAgents().map((agent, index) => (
                    <tr 
                      key={index} 
                      className={`
                        border-t
                        ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                        hover:bg-blue-100 transition-colors duration-200
                      `}
                    >
                      <td className="py-4 px-6 font-medium">{agent.name}</td>
                      <td className="py-4 px-6">{agent.email}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(agent.skill) ? agent.skill.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          )) : "No skills listed"}
                        </div>
                      </td>
                      <td className="py-4 px-6">{agent.range} km</td>
                      <td className="py-4 px-6">{agent.location}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Updated pagination section to show filtered count */}
            <div className="mt-4 flex justify-between items-center text-gray-600">
              <p>Showing {getFilteredAgents().length} of {serviceAgents.length} agents</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Keep existing form modal */}
        {/* ... rest of the code remains the same ... */}
      </Layout>
     {/* Popup Form */}
     {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-lg relative slide-down my-8">
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
                <label className="block text-gray-700 font-medium mb-2">
                  Skills
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        className="mr-2"
                      />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}
                </div>
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
                  max="20"
                  step="1"
                  value={formData.range}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#1c4e80]"
                />
              </div>
              <span className="ml-4 text-gray-700 font-medium">
                {formData.range} km
              </span>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1c4e80] focus:border-transparent outline-none transition"
                >
                  <option value="">Select Location</option>
                  <option value="Electronic City">Electronic City</option>
                  <option value="Bommasandra">Bommasandra</option>
                  <option value="Kormangala">Kormangala</option>
                  <option value="Marathahalli">Marathahalli</option>
                  <option value="Whitefield">Whitefield</option>
                  <option value="Hebbal">Hebbal</option>
                  <option value="Kengeri">Kengeri</option>
                  <option value="Yelahanka">Yelahanka</option>
                  <option value="Nagawara">Nagawara</option>
                  <option value="Doddaballapur">Doddaballapur</option>
                  <option value="Kundalahalli">Kundalahalli</option>
                  <option value="Kadugodi">Kadugodi</option>
                  <option value="Jayanagar">Jayanagar</option>
                  <option value="K R Puram">K R Puram</option>
                  <option value="Majestic">Majestic</option>
                  <option value="Rajarajeshwari Nagar">Rajarajeshwari Nagar</option>
                  <option value="M G Road">M G Road</option>
                  <option value="Mysore Road">Mysore Road</option>
                  <option value="Vijaynagar">Vijaynagar</option>
                  <option value="Peenya">Peenya</option>
                  <option value="Attiguppe">Attiguppe</option>
                  <option value="Kengeri Signal">Kengeri Signal</option>
                  <option value="K R Pet Signal">K R Pet Signal</option>
                  <option value="RR Nagar">RR Nagar</option>
                  <option value="Attibele">Attibele</option>
                  <option value="Hoskote">Hoskote</option>
                  <option value="HSR Layout">HSR Layout</option>
                </select>
              </div>

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