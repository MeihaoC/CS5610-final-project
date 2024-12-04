// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import axios from "axios"; // For making HTTP requests
import "../css/ShoppingCart.css"; // Import CSS for styling

// Define the ShoppingCart component
const ShoppingCart = () => {
  // State to manage cart items
  const [cart, setCart] = useState([]);
  
  // State to manage the total cost
  const [total, setTotal] = useState(0);
<<<<<<< HEAD
  const [isUpdating, setIsUpdating] = useState(false); 
=======

  // State to track whether the cart is being updated
  const [isUpdating, setIsUpdating] = useState(false);

  // Hook for navigation
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
  const navigate = useNavigate();

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to fetch cart items from the server
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    // Redirect to login if the user is not authenticated
    if (!token) {
      alert("Please log in to view your cart.");
      navigate("/login");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/cart`, {
=======
      // Make a GET request to fetch the cart items
      const response = await axios.get("http://localhost:5002/api/users/cart", {
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data); // Set the cart items
      calculateTotal(response.data); // Calculate the total cost
    } catch (err) {
      console.error("Error fetching cart:", err); // Log errors
      alert("Failed to load cart. Please try again.");
    }
  };

  // Function to calculate the total cost of the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(total); // Update the total state
  };

  // Function to update the quantity of a cart item
  const updateCartQuantity = async (productId, change) => {
    const token = localStorage.getItem("token");
    const currentItem = cart.find((item) => item.product._id === productId);

    if (!currentItem) return; // Return if the item is not found

    const newQuantity = currentItem.quantity + change;
    if (newQuantity < 1) return; // Prevent quantities less than 1

    try {
      // Make a POST request to update the cart item quantity
      await axios.post(
<<<<<<< HEAD
        `${process.env.REACT_APP_API_BASE_URL}/users/cart`,
        { productId, quantity: newQuantity }, 
=======
        "http://localhost:5002/api/users/cart",
        { productId, quantity: newQuantity },
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart(); // Refresh the cart after updating
    } catch (err) {
      console.error("Error updating quantity:", err); // Log errors
      alert("Failed to update quantity.");
    }
  };

  // Function to remove an item from the cart
  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");

    try {
<<<<<<< HEAD
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/cart/item/${productId}`, {
=======
      // Make a DELETE request to remove the item from the cart
      await axios.delete(`http://localhost:5002/api/users/cart/item/${productId}`, {
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Refresh the cart after removing the item
    } catch (err) {
      console.error("Error removing item:", err); // Log errors
      alert("Failed to remove item from cart.");
    }
  };

  // Navigate to the checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          {/* Table displaying cart items */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => updateCartQuantity(item.product._id, -1)} // Decrease quantity
                      disabled={item.quantity <= 1 || isUpdating} // Disable if quantity is 1
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateCartQuantity(item.product._id, 1)} // Increase quantity
                      disabled={isUpdating} // Disable if updating
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.product._id)} // Remove item
                      disabled={isUpdating} // Disable if updating
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Total cost and checkout button */}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button
              className="checkout-button"
              onClick={handleCheckout} // Navigate to checkout
              disabled={isUpdating} // Disable if updating
            >
              Check Out
            </button>
          </div>
        </>
      ) : (
        // Message when the cart is empty
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
