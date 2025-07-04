import React, { useState } from "react";
import { apiAuth } from "../../api/Apislice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = apiAuth.useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await login({ email, password }).unwrap();
      console.log("Login successful:", response);

      // Save token and user info
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user_info));

      toast.success("Login successful!");

      navigate("/dashboard"); // Redirect to dashboard or home page

      // Redirect or update UI
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    // Remove token and user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page or home
    
  };

  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <div
      className="text-white h-[100vh] flex items-center justify-center bg-cover"
      style={{ background: "url('../src/assets/react.jpg')" }}
    >
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
      
      
          <>
            <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="relative my-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-focus:scale-75"
                >
                  Email
                </label>
              </div>
              <div className="relative my-4">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-focus:scale-75"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="w-full mb-4 text-[18px] mt-6 rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Login
              </button>
            </form>
          </>
       
      </div>
    </div>
  );
};

export default Login;
