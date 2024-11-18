import Layout from '../../layout.jsx';

// function AgentHome() {
//   return (
//     <Layout>
//       <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
//         <h1 className="text-[#1c4e80] text-3xl font-bold mb-4">Welcome to the Service Agent Home Page</h1>
//         <p className="text-gray-700 mb-6">Manage and oversee site content with ease.</p>
//       </div>
//     </Layout>
//   );
// }

function AgentHome() {
  return (
    <Layout>
      <div className="admin-home bg-[#eaf0f7] min-h-screen p-6">
        {/* Header Section */}
        <h1 className="text-[#1c4e80] text-4xl font-bold mb-6">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Easily manage and oversee all site activities.
        </p>

        {/* Dashboard Grid */}
        <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">User Management</h2>
            <p className="text-gray-600 mb-4">
              View, edit, and manage user accounts and roles.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              Manage Users
            </button>
          </div>

          {/* Content Management */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Content Management</h2>
            <p className="text-gray-600 mb-4">
              Add, edit, or delete content across the platform.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              Manage Content
            </button>
          </div>

          {/* Reports */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Reports</h2>
            <p className="text-gray-600 mb-4">
              Generate and view detailed reports and analytics.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              View Reports
            </button>
          </div>

          {/* Settings */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Settings</h2>
            <p className="text-gray-600 mb-4">
              Configure site settings and preferences.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              Go to Settings
            </button>
          </div>

          {/* Notifications */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Notifications</h2>
            <p className="text-gray-600 mb-4">
              View and manage admin notifications and alerts.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              Check Notifications
            </button>
          </div>

          {/* Help & Support */}
          <div className="dashboard-card bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#1c4e80] mb-2">Help & Support</h2>
            <p className="text-gray-600 mb-4">
              Access guides and contact support for assistance.
            </p>
            <button className="bg-[#1c4e80] text-white py-2 px-4 rounded hover:bg-[#163a60]">
              Get Help
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}




export default AgentHome;