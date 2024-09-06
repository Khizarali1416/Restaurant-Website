// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection

// Route imports
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();
require('dotenv').config();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
