// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {signup,login,getAdminById,getAllAdmins,getAllUsers,updateAdmin,deleteAdmin} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware')
// Admin Signup
router.post('/signup', signup);

// Admin Login
router.post('/login', login);

// Get Admin Details by ID
router.get('/:id', adminMiddleware, getAdminById);

// List All Admins (Admin only)
router.get('/', adminMiddleware, getAllAdmins);

// router.get('/users',adminMiddleware,  getAllUsers)

// Update Admin Information
router.put('/:id', adminMiddleware, updateAdmin);

// Delete Admin (Admin only)
router.delete('/:id', adminMiddleware, deleteAdmin);

module.exports = router;
