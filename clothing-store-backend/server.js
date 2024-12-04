// Import necessary modules
const express = require("express"); // Framework for building the server
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // Module to load environment variables

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to enable CORS (allows cross-origin requests)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Import route handlers
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Define API routes
app.use("/api/users", userRoutes); // Routes for user-related endpoints
app.use("/api/products", productRoutes); // Routes for product-related endpoints
app.use("/api/orders", orderRoutes); // Routes for order-related endpoints

// Define the port for the server
const PORT = process.env.PORT || 5002; // Default to 5002 if PORT is not defined in .env

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI) // MongoDB connection string from .env
  .then(() => {
    console.log("Connected to MongoDB"); // Log successful connection
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server
  })
  .catch(err => console.error("Could not connect to MongoDB", err)); // Log connection errors
