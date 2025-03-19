import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerAuth = ({ setToken, setRole }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isSignup
        ? "https://zoomaar.onrender.com/api/seller/signup"
        : "https://zoomaar.onrender.com/api/seller/login";

      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("API Response:", data); // ✅ Debugging

      
      if (data.token && data.role) {
        console.log("Storing Role in LocalStorage:", data.role);

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setToken(data.token);
        setRole(data.role);

        navigate("/seller-dashboard");
      } else {
        console.error("Invalid response:", data);
      }

      if (isSignup) setIsSignup(false); // Switch to login after signup
    } catch (error) {
      console.error("Auth Error:", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="mb-2 p-2 border w-full" required />
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2 p-2 border w-full" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="mb-4 p-2 border w-full" required />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded" disabled={loading}>
          {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default SellerAuth;
