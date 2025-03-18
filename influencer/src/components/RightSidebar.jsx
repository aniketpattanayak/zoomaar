import React from "react";

const RightSidebar = () => {
  return (
    <div className="w-60 bg-gray-100 h-screen p-5 border-l border-gray-300">
      <h2 className="text-xl font-bold mb-4">Profile Summary</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-gray-500">Influencer | 50K Followers</p>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-2">Earnings</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-green-600 text-2xl font-bold">$5,240</p>
        <p className="text-gray-500">This Month</p>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-2">Upcoming Payouts</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-blue-600 font-semibold">$1,200</p>
        <p className="text-gray-500">Next Week</p>
      </div>
    </div>
  );
};

export default RightSidebar;
