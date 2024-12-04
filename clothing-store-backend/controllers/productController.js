// Importing the Product model
const Product = require("../models/Product");

// Handler to fetch all products based on optional filters
exports.getAllProducts = async (req, res) => {
  try {
    // Extracting query parameters from the request
    const { category, minPrice, maxPrice, color, size } = req.query;
    const filter = {}; // Initializing an empty filter object

    // Adding category filter if specified
    if (category) {
      filter.category = category;
    }

    // Adding price range filters if specified
    if (minPrice || maxPrice) {
      filter.price = {}; // Create a price object in the filter
      if (minPrice) filter.price.$gte = Number(minPrice); // Minimum price filter
      if (maxPrice) filter.price.$lte = Number(maxPrice); // Maximum price filter
    }

    // Adding size filter if specified
    if (size) {
      filter.size = size;
    }

    // Fetching products from the database based on the filter
    const products = await Product.find(filter);
    res.send(products); // Sending the filtered products as the response
  } catch (error) {
    // Sending an error response if an issue occurs during fetching
    res.status(500).send("Error fetching products");
  }
};

// Handler to fetch a specific product by its ID
exports.getProductById = async (req, res) => {
  try {
    // Fetching the product by its ID from the database
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found"); // Handling not found scenario
    res.send(product); // Sending the found product as the response
  } catch (error) {
    // Sending an error response if an issue occurs during fetching
    res.status(500).send("Error fetching product details");
  }
};

// Handler to search for products based on a query
exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q; // Extracting the search query from the request
    if (!query) {
      return res.status(400).send("Query parameter is required"); // Validation for missing query
    }

    // Performing a case-insensitive search for products by name
    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // Regex for partial matching, case-insensitive
    });

    res.json(products); // Sending the search results as the response
  } catch (error) {
    console.error("Error during search:", error.message); // Logging the error for debugging
    res.status(500).send("Error during search"); // Sending an error response
  }
};
