// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import RightSidebar from "../components/RightSidebar";
// import Dashboard from "./Dashboard";
// import UploadContent from "./UploadContent";
// import Earnings from "./Earnings";
// import Collaborations from "./Collaborations";

// const InfluencerDashboard = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Left Sidebar */}
//       <Sidebar />

//       {/* Middle Content Area */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/upload" element={<UploadContent />} />
//           <Route path="/earnings" element={<Earnings />} />
//           <Route path="/collaborations" element={<Collaborations />} />
//         </Routes>
//       </div>

//       {/* Right Sidebar (Static Content) */}
//       <RightSidebar />
//     </div>
//   );
// };

// export default InfluencerDashboard;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import Dashboard from "./Dashboard";
import UploadContent from "./UploadContent";
import Earnings from "./Earnings";
import Collaborations from "./Collaborations";

const InfluencerDashboard = ({ setToken }) => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <Sidebar setToken={setToken} />

      {/* Middle Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadContent />} />
          <Route path="/earnings" element={<Earnings />} />
          
          <Route path="/collaborations" element={<Collaborations />} />
          {/* Catch-all route for invalid URLs inside influencer dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default InfluencerDashboard;
