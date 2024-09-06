// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {signup,login,getUserById,getAllUsers,deleteUser} = require('../controllers/userController');
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware for authentication and authorization
const userMiddleware = require('../middleware/userMiddleware'); // Middleware for authentication and authorization

// User Signup
router.post('/signup', signup);

// User Login
router.post('/login', login);

// Get User Details by ID
router.get('/:id',userMiddleware, getUserById);

// List All Users (Admin only)
router.get('/allUsers',adminMiddleware,  getAllUsers);

// Delete User (Admin only)
router.delete('/:id', adminMiddleware, deleteUser);

module.exports = router;
