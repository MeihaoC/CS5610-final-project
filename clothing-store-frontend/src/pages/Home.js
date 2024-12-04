// Import necessary modules and components
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import "../css/HomePage.css";
=======
import axios from "axios"; // For making HTTP requests
import config from "../config"; // Configuration file for API base URL
import { Link, useSearchParams } from "react-router-dom"; // React Router utilities for navigation and query params
import "../css/HomePage.css"; // Import CSS styles for the homepage
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e

// Define the HomePage functional component
const HomePage = () => {
  // State variables
  const [products, setProducts] = useState([]); // Stores all fetched products
  const [selectedCategory, setSelectedCategory] = useState([]); // Tracks selected product categories
  const [selectedSize, setSelectedSize] = useState([]); // Tracks selected product sizes
  const [sortBy, setSortBy] = useState("featured"); // Sort preference (default: featured)
  const [searchParams] = useSearchParams(); // Hook to get query parameters
  const searchQuery = searchParams.get("q") || ""; // Extract search query from URL

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        setProducts(response.data);
=======
        const response = await axios.get(`${config.API_BASE_URL}/products`);
        setProducts(response.data); // Set fetched products to state
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
      } catch (err) {
        console.error("Error fetching products:", err); // Log errors
      }
    };

    fetchProducts(); // Invoke the function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Toggle selected categories in the filter
  const toggleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  // Toggle selected sizes in the filter
  const toggleSize = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size) // Remove size if already selected
        : [...prev, size] // Add size if not selected
    );
  };

  // Filter and sort products based on user preferences
  const filteredProducts = products
    .filter((product) => {
      // Filter by selected categories
      if (selectedCategory.length > 0 && !selectedCategory.includes(product.category)) {
        return false;
      }
      // Filter by selected sizes
      if (selectedSize.length > 0 && !selectedSize.includes(product.size)) {
        return false;
      }
      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true; // Include product if it passes all filters
    })
    .sort((a, b) => {
      // Sort by preference
      if (sortBy === "featured") {
<<<<<<< HEAD
        return Math.random() - 0.5;
=======
        return Math.random() - 0.5; // Randomize order for "featured"
>>>>>>> ace1e3906cfdef61dddfeb976dc43a1072c1b86e
      }
      return sortBy === "low-to-high" ? a.price - b.price : b.price - a.price; // Sort by price
    });

  return (
    <div className="homepage">
      <div className="main-content">
        {/* Sidebar with filters */}
        <aside className="sidebar">
          {/* Filter by category */}
          <div className="filter-group">
            <h3>Product Categories</h3>
            <ul>
              {["Top", "Pants", "Dress"].map((category) => (
                <li key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category)} // Checkbox state
                    onChange={() => toggleCategory(category)} // Toggle category on change
                  />{" "}
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Filter by size */}
          <div className="filter-group">
            <h3>Filter by Size</h3>
            <ul>
              {["S", "M", "L", "XL"].map((size) => (
                <li key={size}>
                  <input
                    type="checkbox"
                    checked={selectedSize.includes(size)} // Checkbox state
                    onChange={() => toggleSize(size)} // Toggle size on change
                  />{" "}
                  {size}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main product display */}
        <section className="products">
          <div className="products-header">
            {/* Breadcrumb navigation */}
            <p>Shop &gt; All Products</p>
            {/* Sort by dropdown */}
            <div className="sort-by">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid display of products */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`} // Navigate to product details
                  className="product-card"
                  key={product._id}
                >
                  {/* Product image */}
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  {/* Product name and price */}
                  <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                </Link>
              ))
            ) : (
              <p>No products found.</p> // Message when no products match filters
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
