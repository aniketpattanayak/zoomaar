import React from "react";

const influencers = [
  {
    name: "Susan Adams",
    location: "Barcelona, ESP",
    followers: "870k",
    category: "Comedy",
    price: "$5200",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Tamara Brown",
    location: "Wellington, NZ",
    followers: "440k",
    category: "Lifestyle",
    price: "$2400",
    image: "https://via.placeholder.com/100",
  },
  {
    name: "Jay Keller",
    location: "New York, USA",
    followers: "315k",
    category: "Fashion",
    price: "$2150",
    image: "https://via.placeholder.com/100",
  },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Find Influencers to collaborate with</h1>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg text-black"
        />
      </div>

      {/* Influencer Cards */}
      <div className="grid grid-cols-3 gap-6">
        {influencers.map((influencer, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={influencer.image}
              alt={influencer.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold mt-4 text-center">
              {influencer.name}
            </h2>
            <p className="text-sm text-gray-400 text-center">
              {influencer.location}
            </p>
            <p className="text-center mt-2 text-green-400">{influencer.followers} Followers</p>
            <p className="text-center mt-1 text-yellow-400">{influencer.category}</p>
            <p className="text-center mt-1 text-blue-400">Advertising Price: {influencer.price}</p>
            <button className="mt-4 w-full bg-green-500 px-4 py-2 rounded-lg">
              Send Message
            </button>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-purple-500 px-6 py-3 rounded-lg text-lg">
          Show All
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
