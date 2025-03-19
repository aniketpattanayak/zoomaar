import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isSignup
        ? "https://zoomaar.onrender.com/api/admin/signup"
        : "https://zoomaar.onrender.com/api/admin/login";

      const { data } = await axios.post(url, formData, {
    
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("adminToken", data.token);
      alert(isSignup ? "Signup Successful!" : "Login Successful!");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignup ? "Admin Signup" : "Admin Login"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignup ? "Already an admin?" : "New admin?"}
          <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 font-bold ml-1">
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
