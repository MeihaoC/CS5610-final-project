// Import necessary modules and models
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

// Handler to register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists.");

    // Create a new user
    user = new User({ email, username });
    user.password = await user.hashPassword(password); // Hash the password before saving
    await user.save();

    // Generate a token for the newly registered user
    const token = user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).send("Error registering user");
  }
};

// Handler to log in an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    // Check if the provided password matches the stored password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password.");

    // Generate a token for the authenticated user
    const token = user.generateAuthToken();
    res.send({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).send("Error logging in");
  }
};

// Handler to get the user's cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product", "name price");
    if (!user) return res.status(404).send("User not found");

    res.send(user.cart); // Send the user's cart as a response
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).send("Error fetching cart");
  }
};

// Handler to add or update items in the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("User not found");

    // Check if the product is already in the cart
    const cartItem = user.cart.find((item) => item.product.toString() === productId);
    if (cartItem) {
      cartItem.quantity = quantity; // Update the quantity if the item exists
    } else {
      user.cart.push({ product: productId, quantity }); // Add a new item to the cart
    }

    await user.save();

    // Send the updated cart with product details
    const updatedCart = await User.findById(req.user._id).populate("cart.product", "name price");
    res.send(updatedCart.cart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).send("Error updating cart");
  }
};

// Handler to remove an item from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Remove the specified item from the cart
    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    res.send(user.cart);
  } catch (error) {
    res.status(500).send("Error removing item from cart");
  }
};

// Handler to process a checkout
exports.checkout = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, currency, totalAmount } = req.body;

    // Find the user and populate the cart with product details
    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).send("User not found");

    if (user.cart.length === 0) {
      return res.status(400).send("Cart is empty");
    }

    // Create a new order
    const order = new Order({
      user: userId,
      products: user.cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      currency,
      shippingAddress,
      status: "Ordered",
      orderDate: Date.now(),
    });

    await order.save();

    // Clear the user's cart and update order history
    user.cart = [];
    user.orderHistory.push(order._id);
    await user.save();

    res.send(order); // Send the created order as a response
  } catch (error) {
    console.error("Error during checkout:", error.message);
    res.status(500).send("Error during checkout");
  }
};

// Handler to get the user's profile with order history
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("orderHistory");
    if (!user) return res.status(404).send("User not found");

    // Format the order history with currency details
    const orderHistoryWithCurrency = user.orderHistory.map(order => ({
      _id: order._id,
      user: order.user,
      products: order.products,
      totalAmount: order.totalAmount,
      currency: order.currency,
      shippingAddress: order.shippingAddress,
      status: order.status,
      orderDate: order.orderDate,
    }));

    // Send the user profile and formatted order history as a response
    res.send({
      username: user.username,
      email: user.email,
      orderHistory: orderHistoryWithCurrency,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).send("Error fetching user profile");
  }
};
