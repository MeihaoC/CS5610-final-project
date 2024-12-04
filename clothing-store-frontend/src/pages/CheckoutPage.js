// Import necessary modules and hooks from React and other libraries
import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests
import "../css/CheckoutPage.css"; // Import CSS styles
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Define the CheckoutPage functional component
const CheckoutPage = () => {
  // State variables for managing cart items and totals
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // State variables for currency conversion
  const [currency, setCurrency] = useState("CAD"); // Default currency
  const [exchangeRate, setExchangeRate] = useState(1); // Default exchange rate
  const [convertedTotal, setConvertedTotal] = useState(0); // Total in selected currency

  // State for shipping information input by the user
  const [shippingInfo, setShippingInfo] = useState({
    userName: "",
    streetAddress: "",
    city: "",
    province: "",
    zipCode: "",
  });

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Fetch the cart items when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch exchange rates whenever the selected currency changes
  useEffect(() => {
    if (currency !== "CAD") {
      fetchExchangeRate();
    } else {
      setExchangeRate(1); // Reset to default if currency is CAD
    }
  }, [currency]);

  // Recalculate the converted total whenever the total or exchange rate changes
  useEffect(() => {
    setConvertedTotal((total * exchangeRate).toFixed(2)); // Keep two decimal places
  }, [total, exchangeRate]);

  // Function to fetch the user's cart from the server
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to proceed with checkout.");
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    try {
      // Get the cart data from the API
      const response = await axios.get("http://localhost:5002/api/users/cart", {
        headers: { Authorization: `Bearer ${token}` }, // Include auth token
      });
      setCart(response.data); // Update cart state
      calculateTotal(response.data); // Calculate the total price
    } catch (err) {
      console.error("Error fetching cart:", err);
      alert("Failed to load cart for checkout.");
    }
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(total); // Update total state
  };

  // Function to fetch the exchange rate from an external API
  const fetchExchangeRate = async () => {
    const apiKey = "[YOUR_API_KEY]"; // Replace with your actual API key
    const requestUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=USD,EUR,GBP,CAD`;

    try {
      console.log("Request URL:", requestUrl);
      const response = await axios.get(requestUrl);

      if (response.data && response.data.rates) {
        if (currency === "CAD") {
          setExchangeRate(1); // No conversion needed
        } else if (response.data.rates["CAD"]) {
          // Calculate exchange rate relative to CAD
          setExchangeRate(response.data.rates[currency] / response.data.rates["CAD"]);
        } else {
          alert("Failed to load CAD exchange rate.");
        }
      } else {
        console.error("Exchange rate data format is unexpected:", response.data);
        alert("Failed to load exchange rate.");
      }
    } catch (err) {
      console.error(
        "Error fetching exchange rates:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to load exchange rate. Please check your network or API key.");
    }
  };

  // Handle changes in the currency selection dropdown
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  // Handle changes in the shipping information form inputs
  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Function to handle the checkout process
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    try {
      // Send checkout request to the server
      const response = await axios.post(
        "http://localhost:5002/api/users/cart/checkout",
        {
          shippingAddress: shippingInfo,
          currency: currency,
          totalAmount: convertedTotal,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      navigate("/profile"); // Redirect to user's profile page
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-form">
        <div>
          <h3>Shipping Address</h3>
          <form>
            {/* Input fields for user's shipping information */}
            <label>
              Username:
              <input
                type="text"
                name="userName"
                value={shippingInfo.userName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Street Address:
              <input
                type="text"
                name="streetAddress"
                value={shippingInfo.streetAddress}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Province:
              <input
                type="text"
                name="province"
                value={shippingInfo.province}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Zip Code:
              <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                required
              />
            </label>
          </form>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          {/* Display each item in the cart */}
          {cart.map((item) => (
            <div key={item.product._id}>
              <p>
                {item.product.name} - ${item.product.price.toFixed(2)} x{" "}
                {item.quantity}
              </p>
            </div>
          ))}
          {/* Currency selection dropdown */}
          <label>
            Currency:
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          {/* Display the total amount in the selected currency */}
          <p>
            Total: {currency} {convertedTotal}
          </p>
          {/* Button to initiate checkout */}
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

// Export the CheckoutPage component
export default CheckoutPage;
