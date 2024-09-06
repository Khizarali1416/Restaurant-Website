// backend/routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const {addFood,updateFood,deleteFood,getFoodById,getAllFoods} = require('../controllers/foodController');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const upload = require('../config/multer');

// Admin routes for managing food
router.post('/', adminMiddleware, upload.single('image'), addFood);
router.put('/:id', adminMiddleware, upload.single('image'), updateFood);
router.delete('/:id', adminMiddleware, deleteFood);

// User routes for viewing food
router.get('/:id', userMiddleware, getFoodById);
router.get('/', getAllFoods);

module.exports = router;
