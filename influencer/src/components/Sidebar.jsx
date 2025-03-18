// // import React from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // const menuItems = [
// //   { name: "Dashboard", path: "/dashboard" },
// //   { name: "Upload Content", path: "/upload" },
// //   { name: "Earnings", path: "/earnings" },
// //   { name: "Collaborations", path: "/collaborations" },
// // ];

// // const Sidebar = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // 🔹 Logout function
// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // ✅ Clear token
// //     navigate("/auth"); // ✅ Redirect to login
// //   };

// //   return (
// //     <div className="w-60 bg-gray-900 text-white h-screen p-5 flex flex-col justify-between">
// //       <div>
// //         <h2 className="text-2xl font-bold text-center mb-6">Influencer Panel</h2>
// //         <nav>
// //           {menuItems.map((item, index) => (
// //             <Link
// //               key={index}
// //               to={item.path}
// //               className={`block py-3 px-4 rounded-md mb-2 text-lg ${
// //                 location.pathname === item.path
// //                   ? "bg-blue-600 text-white"
// //                   : "hover:bg-gray-700"
// //               }`}
// //             >
// //               {item.name}
// //             </Link>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* 🔹 Logout Button */}
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md w-full mt-4"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // };

// // export default Sidebar;


// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const menuItems = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "Upload Content", path: "/upload" },
//   { name: "Earnings", path: "/earnings" },
//   { name: "Collaborations", path: "/collaborations" },
// ];

// const Sidebar = ({ setToken }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     navigate("/auth");
//   };

//   return (
//     <div className="w-60 bg-gray-900 text-white h-screen p-5 flex flex-col justify-between">
//       <div>
//         <h2 className="text-2xl font-bold text-center mb-6">Influencer Panel</h2>
//         <nav>
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className={`block py-3 px-4 rounded-md mb-2 text-lg ${
//                 location.pathname === item.path
//                   ? "bg-blue-600 text-white"
//                   : "hover:bg-gray-700"
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md w-full mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;




// Sidebar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Upload Content", path: "/upload" },
  { name: "Earnings", path: "/earnings" },
  { name: "Collaborations", path: "/collaborations" },
];

const Sidebar = ({ setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  };

  return (
    <div className="w-60 bg-gray-900 text-white h-screen p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Influencer Panel</h2>
        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block py-3 px-4 rounded-md mb-2 text-lg ${
                location.pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Go Live Button */}
        <button
          onClick={() => navigate("/live")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md w-full mt-4"
        >
          Go Live
        </button>
      </div>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md w-full mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;