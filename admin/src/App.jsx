// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AuthForm from "./pages/AuthForm";
// import AdminDashboard from "./pages/AdminDashboard";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<AuthForm />} />
//         <Route path="/admin/*" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        
        {/* Default Redirect if accessing root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
