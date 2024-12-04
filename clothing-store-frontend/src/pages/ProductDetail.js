// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks for params and navigation
import axios from "axios"; // For making HTTP requests
import "../css/ProductDetail.css"; // CSS for styling

// Define the ProductDetail component
const ProductDetail = () => {
  // Extract the product ID from the URL parameters
  const { id } = useParams();
<<<<<<< HEAD
  const navigate = useNavigate(); 
=======

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to hold product details
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
  const [product, setProduct] = useState(null);

  // State to manage selected size
  const [selectedSize, setSelectedSize] = useState("S");

  // State to manage selected quantity
  const [quantity, setQuantity] = useState(1);

  // Fetch product details when the component mounts or the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
        setProduct(response.data);
=======
        // Make a GET request to fetch product details
        const response = await axios.get(`http://localhost:5002/api/products/${id}`);
        setProduct(response.data); // Set product details in state
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
      } catch (err) {
        console.error("Error fetching product details:", err); // Log error
      }
    };

    fetchProduct();
  }, [id]); // Dependency array ensures this runs whenever `id` changes

  // Increase quantity by 1
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Decrease quantity by 1 (minimum of 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Handle adding the product to the cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    // Redirect to login if the user is not authenticated
    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      // Make a POST request to add the product to the user's cart
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/cart`,
        { productId: id, quantity, size: selectedSize },
        { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
      );

      alert("Product added to cart!");
      console.log("Cart updated:", response.data);
<<<<<<< HEAD
      navigate("/cart"); 
=======
      navigate("/cart"); // Redirect to cart page
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
    } catch (err) {
      console.error("Error adding to cart:", err); // Log error
      alert("Failed to add product to cart."); // Notify user
    }
  };

  // Show loading message while product data is being fetched
  if (!product) {
    return <p>Loading product details...</p>;
  }

  // Render product details
  return (
    <div className="product-detail">
      {/* Breadcrumb navigation */}
      <nav className="breadcrumb">
        Shop &gt; {product.category} &gt; {product.name}
      </nav>

      <div className="product-container">
        {/* Product image */}
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        {/* Product information */}
        <div className="product-info">
          <h2>{product.brand || "Brand"}</h2>
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
        </div>

        {/* Size selection */}
        <div className="size-options">
          <p>Size:</p>
          <div className="size-buttons">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "selected" : ""} // Highlight selected size
                onClick={() => setSelectedSize(size)} // Update selected size
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity selection */}
        <div className="quantity-selector">
          <button onClick={decreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>

        {/* Total price */}
        <p className="total-price">${(product.price * quantity).toFixed(2)}</p>

        {/* Add to cart button */}
        <button onClick={addToCart} className="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
