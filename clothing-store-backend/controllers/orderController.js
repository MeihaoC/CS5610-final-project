// Importing the Order model
const Order = require("../models/Order");

// Handler to fetch order history of a user
exports.getOrderHistory = async (req, res) => {
  try {
    // Find all orders belonging to the authenticated user and populate product details (name and price)
    const orders = await Order.find({ user: req.user._id }).populate("products.product", "name price");
    // Send the found orders to the client
    res.send(orders);
  } catch (error) {
    // Send an error response if there's an issue fetching the order history
    res.status(500).send("Error fetching order history");
  }
};

// Handler to update the status of a specific order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate the provided status
    if (!["Ordered", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).send("Invalid status");
    }

    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");

    // Prevent updating orders that are already delivered
    if (order.status === "Delivered") {
      return res.status(400).send("Delivered orders cannot be updated");
    }

    // Prevent updating orders that are already cancelled
    if (order.status === "Cancelled") {
      return res.status(400).send("Cancelled orders cannot be updated");
    }

    // Update the order status and save the changes
    order.status = status;
    await order.save();

    // Send the updated order back to the client
    res.send(order);
  } catch (error) {
    // Send an error response if there's an issue updating the order status
    res.status(500).send("Error updating order status");
  }
};
