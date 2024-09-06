// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {createOrder,getOrderById,getAllOrders,updateOrderStatus} = require('../controllers/orderController');
const userMiddleware = require('../middleware/userMiddleware'); // Middleware for authentication and authorization
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware for authentication and authorization

// Create a New Order (User only)
router.post('/', userMiddleware, createOrder);

// Get Order Details by ID (User or Admin)
router.get('/:id', userMiddleware, getOrderById);

// List All Orders (Admin only)
router.get('/', adminMiddleware, getAllOrders);

// Update Order Status (Admin only)
router.put('/:id/status', adminMiddleware, updateOrderStatus);

module.exports = router;
