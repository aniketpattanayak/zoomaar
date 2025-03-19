import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ setToken }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "https://zoomaar.onrender.com/api/influencer/signup"
        : "https://zoomaar.onrender.com/api/influencer/login";

      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });


    if (!data.influencer || !data.influencer.id) {
      throw new Error("Invalid user data received from API.");
    }


      // ✅ Store token and userId in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.influencer.id); // Save userId
      console.log("✅ User ID stored in localStorage:", data.influencer.id);
      setToken(data.token); // ✅ Update state

     // console.log("User ID stored:", data.influencer.id);


     navigate("/live");
      // ✅ Redirect to Live Stream page
     // navigate(`/live/${data.influencer.id}`);

    } catch (error) {
      console.error("Auth Error:", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="mb-2 p-2 border w-full"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-2 p-2 border w-full"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 border w-full"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-2 text-sm cursor-pointer text-blue-600" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
