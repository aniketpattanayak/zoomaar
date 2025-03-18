// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import InfluencerDashboard from "./pages/InfluencerDashboard";
// import AuthForm from "./pages/AuthForm"; // Import the authentication form

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   return (
//     <Router>
//       <div className="bg-gray-50 min-h-screen">
//         <Routes>
//           {/* Authentication Routes */}
//           <Route
//             path="/auth"
//             element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/dashboard" />}
//           />

//           {/* Influencer Panel Routes */}
//           <Route
//             path="/*"
//             element={token ? <InfluencerDashboard setToken={setToken} /> : <Navigate to="/auth" />}
//           />

//           {/* Catch-All Route Redirects */}
//           <Route path="*" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import LiveStream from "./components/LiveStream";  // Import Live Stream Page
import AuthForm from "./pages/AuthForm"; 
//import { Broadcaster } from "./components/Broadcaster";
import LiveStreams from "./components/LiveStreams";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/auth"
            element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/dashboard" />}
          />

          {/* Influencer Panel Routes */}
          <Route
            path="/*"
            element={token ? <InfluencerDashboard setToken={setToken} /> : <Navigate to="/auth" />}
          />

          {/* Live Stream Route */}
          <Route path="/live" element={token ? <LiveStreams /> : <Navigate to="/auth" />} />

          {/* Catch-All Route Redirects */}
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
