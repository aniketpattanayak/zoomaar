import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Profile Header */}
      <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
      <div className="border-b pb-4 mt-2">
        <p className="text-gray-600">Manage your profile information, orders, and saved items.</p>
      </div>
      
      {/* Personal Details */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Personal Details</h3>
        <div className="mt-3 space-y-2">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Mobile:</strong> +91 9876543210</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Address:</strong> 123 Street, City, Country</p>
        </div>
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Edit</button>
      </div>
      
      {/* Orders Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">My Orders</h3>
        <div className="mt-3 bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700">You have 2 active orders.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">View Orders</button>
        </div>
      </div>
      
      {/* Wishlist */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Wishlist</h3>
        <p className="mt-2 text-gray-600">You have 3 items in your wishlist.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">View Wishlist</button>
      </div>
      
      {/* Saved Addresses */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Saved Addresses</h3>
        <p className="mt-2 text-gray-600">Manage your delivery addresses for faster checkout.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Manage Addresses</button>
      </div>
      
      {/* Payment Methods */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">Payment Methods</h3>
        <p className="mt-2 text-gray-600">Manage your saved cards and UPI payments.</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Manage Payments</button>
      </div>
    </div>
  );
};

export default Profile;
