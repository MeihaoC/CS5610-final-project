// Import necessary modules and components
import React, { useEffect, useState } from "react";
import axios from "axios"; // For making HTTP requests
import "../css/UserProfile.css"; // CSS for styling

// UserProfile component, displays user profile and order details
const UserProfile = ({ loggedInUser }) => {
  // State to hold profile data
  const [profileData, setProfileData] = useState(null);
  
  // State to hold order details
  const [orderDetails, setOrderDetails] = useState([]);
  
  // State to manage error messages
  const [error, setError] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      // Handle case where user is not logged in
      if (!token) {
        setError("User is not logged in");
        return;
      }

      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
=======
        // Make a GET request to fetch profile data
        const response = await axios.get("http://localhost:5002/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers for authentication
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
        });

        // Set profile and order details in state
        setProfileData(response.data);
        setOrderDetails(response.data.orderHistory);
      } catch (err) {
        console.error("Error loading profile:", err); // Log error
        setError("Failed to load user profile."); // Display error message
      }
    };

    fetchUserProfile(); // Invoke the function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render error message if there is an error
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Render loading message while profile data is being fetched
  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="user-profile">
      {/* Sidebar with personal information */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/100" alt="User" /> {/* Placeholder image */}
          </div>
          <h3>{profileData.username}</h3> {/* Display username */}
        </div>
        <div className="personal-info">
          <h4>Personal Information</h4>
          <p>
            <strong>Email:</strong> {profileData.email} {/* Display email */}
          </p>
        </div>
      </div>

      {/* Main content with order details */}
      <div className="profile-content">
        <h2>Order Details</h2>
        {orderDetails.length > 0 ? (
          // Map through order details and render each order
          orderDetails.map((order) => (
            <div key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p> {/* Display order ID */}
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p> {/* Display formatted order date */}
              <p><strong>Status:</strong> {order.status}</p> {/* Display order status */}
              <p><strong>Total:</strong> {order.currency} {order.totalAmount.toFixed(2)}</p> {/* Display total amount */}
            </div>
          ))
        ) : (
          // Display message if no order details are available
          <p>No order details available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
