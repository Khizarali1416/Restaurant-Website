// backend/controllers/foodController.js
const Food = require('../models/Food');

// Add New Food (Admin only)
// Add New Food (Admin only)
exports.addFood = async (req, res) => {
    try {
        const { userId, foodName, description, percentageOff, price, hasOffer, freeItemIncluded, paidRelatedProducts } = req.body;

        if (!foodName || !description || !price) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        const imagePath = req.file ? req.file.path : undefined;

        const newFood = new Food({
            adminId: userId,
            foodName,
            description,
            percentageOff,
            price,
            hasOffer,
            freeItemIncluded,
            paidRelatedProducts,
            image: imagePath
        });

        await newFood.save();
        res.status(201).json({ message: 'Food added successfully', food: newFood });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update Food Details (Admin only)
exports.updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const { foodName, description, percentageOff, price, hasOffer, freeItemIncluded, paidRelatedProducts } = req.body;

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        food.foodName = foodName || food.foodName;
        food.description = description || food.description;
        food.percentageOff = percentageOff || food.percentageOff;
        food.price = price || food.price;
        food.hasOffer = hasOffer !== undefined ? hasOffer : food.hasOffer;
        food.freeItemIncluded = freeItemIncluded !== undefined ? freeItemIncluded : food.freeItemIncluded;
        food.paidRelatedProducts = paidRelatedProducts || food.paidRelatedProducts;

        if (req.file) {
            food.image = req.file.path;
        }

        await food.save();
        res.json({ message: 'Food updated successfully', food });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Delete Food (Admin only)
exports.deleteFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Food Details by ID
exports.getFoodById = async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List All Foods
exports.getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
