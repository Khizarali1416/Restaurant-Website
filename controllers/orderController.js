// backend/controllers/orderController.js
const Order = require('../models/Order');

// Create a New Order (User only)
exports.createOrder = async (req, res) => {
    try {
        const { userId, foodId, name, phoneNumber, address } = req.body;

        // Create a new order
        const newOrder = new Order({
            userId,
            foodId,
            name,
            phoneNumber,
            address
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Order Details by ID (User or Admin)
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('foodId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List All Orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('foodId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Order Status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find and update the order status
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
