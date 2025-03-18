// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import DashboardStats from "../components/DashboardStats";
// import UserManagement from "../components/UserManagement";
// import ProductOrderManagement from "../components/ProductOrderManagement";
// import PlatformModeration from "../components/PlatformModeration";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   // Check if admin is authenticated
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       navigate("/login"); // Redirect to login if no token
//     }
//   }, [navigate]);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken"); // Clear token
//     navigate("/login"); // Redirect to login
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>

//         <Routes>
//           <Route path="/" element={<DashboardStats />} />
//           <Route path="/users" element={<UserManagement />} />
//           <Route path="/orders" element={<ProductOrderManagement />} />
//           <Route path="/moderation" element={<PlatformModeration />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import UserManagement from "../components/UserManagement";
import ProductOrderManagement from "../components/ProductOrderManagement";
import PlatformModeration from "../components/PlatformModeration";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  // Redirect to "/admin/dashboard" if on "/admin"
  useEffect(() => {
    if (window.location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear token
    navigate("/login"); // Redirect to login
  };

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Admin Routes */}
        <Routes>
          <Route path="dashboard" element={<DashboardStats />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<ProductOrderManagement />} />
          <Route path="moderation" element={<PlatformModeration />} />
          {/* Redirect to /admin/dashboard if no match */}
          <Route path="*" element={<DashboardStats />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
