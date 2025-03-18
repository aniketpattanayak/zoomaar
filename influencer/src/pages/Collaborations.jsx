import React from "react";

const Collaborations = () => {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Collaborations</h1>
      <p className="mb-6">Manage your brand partnerships and collaborations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, name: "Alice Johnson", category: "Fashion", campaign: "Spring Collection Launch" },
          { id: 2, name: "Michael Lee", category: "Tech", campaign: "New Gadget Promotion" },
          { id: 3, name: "Sophia Martinez", category: "Fitness", campaign: "Wellness Challenge" },
          { id: 4, name: "David Kim", category: "Travel", campaign: "Explore the World Series" },
        ].map((influencer) => (
          <div key={influencer.id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <img src="https://via.placeholder.com/50" alt="Influencer" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{influencer.name}</h3>
                <p className="text-gray-400">Category: {influencer.category}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">Collaborating on: {influencer.campaign}</p>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborations;
