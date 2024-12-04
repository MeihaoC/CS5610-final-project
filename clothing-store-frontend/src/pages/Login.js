// Import necessary modules and components
import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import { useNavigate } from "react-router-dom"; // For navigation
import "../css/Login.css"; // Importing CSS for styling

// Login component with `setLoggedInUser` prop to update user state
const Login = ({ setLoggedInUser }) => {
  // State for registration form data
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
  
  // State for login form data
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Hook for navigation
  const navigate = useNavigate();

  // Handle input changes in the registration form
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value }); // Update the respective field in `registerData`
  };

  // Handle input changes in the login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value }); // Update the respective field in `loginData`
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
<<<<<<< HEAD
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, registerData);
      alert("Account created successfully! Please log in.");
=======
      // Send registration data to the server
      await axios.post("http://localhost:5002/api/users/register", registerData);
      alert("Account created successfully! Please log in."); // Notify the user
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
    } catch (err) {
      console.error("Error creating account:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Error creating account."); // Show error message
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
<<<<<<< HEAD
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, loginData); 
      console.log("Login response:", response.data);
=======
      // Send login data to the server and receive a response
      const response = await axios.post("http://localhost:5002/api/users/login", loginData);
      console.log("Login response:", response.data); // Log server response for debugging
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e

      // Update logged-in user state and store token in localStorage
      setLoggedInUser(response.data.user.username);
      localStorage.setItem("token", response.data.token);

      // Redirect to the home page after successful login
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Error logging in."); // Show error message
    }
  };

  return (
    <div className="login-page">
      {/* Container for both forms */}
      <div className="forms-container">
        
        {/* Login form */}
        <div className="form-box">
          <h2>SIGN IN</h2>
          <p>Required fields are marked with an asterisk (*)</p>
          <form onSubmit={handleLogin}>
            <label>Email address*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange} // Update login form state
              required
            />

            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange} // Update login form state
              required
            />

            <button type="submit" className="btn-primary">
              SIGN IN
            </button>
          </form>
        </div>

        {/* Registration form */}
        <div className="form-box">
          <h2>CREATE ACCOUNT</h2>
          <p>Required fields are marked with an asterisk (*)</p>
          <form onSubmit={handleRegister}>
            <label>Username*</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={registerData.username}
              onChange={handleRegisterChange} // Update registration form state
              required
            />

            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleRegisterChange} // Update registration form state
              required
            />

            <label>Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleRegisterChange} // Update registration form state
              required
            />

            <button type="submit" className="btn-primary">
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
