// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ setToken, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
  };

  const handleGoLive = () => {
    navigate('/live');
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-white shadow-md'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
      <div className='flex gap-4'>
        <button onClick={handleGoLive} className='bg-green-500 text-white px-5 py-2 rounded-full text-xs sm:text-sm'>
          Go Live
        </button>
        <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;