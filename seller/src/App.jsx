import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import SellerAuth from './pages/SellerAuth';
import LiveStream from './components/LiveStream';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [isLive, setIsLive] = useState(false); // Track live streaming state

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }, [token, role]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === "" || role !== "seller" ? (
        <SellerAuth setToken={setToken} setRole={setRole} /> // ✅ Pass setRole

      ) : (
        <>
          {!isLive && <Navbar setToken={setToken} setRole={setRole} />} {/* Hide Navbar during Live */}
          <hr />
          <div className='flex w-full'>
            {!isLive && <Sidebar />} {/* Hide Sidebar during Live */}
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/seller-dashboard" element={<h1 className="text-2xl">Welcome to Seller Dashboard</h1>} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/live" element={<LiveStream setIsLive={setIsLive} />} /> {/* ✅ Add LiveStream Route */}
                <Route path="*" element={<Navigate to="/seller-dashboard" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
