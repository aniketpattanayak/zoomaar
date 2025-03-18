// Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/admin/dashboard" className="block p-2 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/users" className="block p-2 hover:bg-gray-700">
            User Management
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/orders" className="block p-2 hover:bg-gray-700">
            Orders
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/moderation" className="block p-2 hover:bg-gray-700">
            Moderation
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
