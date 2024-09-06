// backend/controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Signup
exports.signup =  async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const admin = new Admin({
          name,
          email,
          password: hash
        });
        await admin.save();
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
        res.status(201).json({ token });
      })
    })
  }
  catch (error) {
    res.status(500).json({ message: 'Server error' }); 
  }
};

// Admin Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, admin.password, async (err, result) => {
      if (result) {
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
        console.log("admin login token : ", token)
        admin.tokens.push({ token });
        await admin.save();
        res.json({ token });
      }
    })

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get Admin Details by ID
exports.getAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Admin Information
exports.updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const { name, email, password } = req.body;

        // Find and update admin
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update fields
        if (name) admin.name = name;
        if (email) admin.email = email;
        if (password) {
            // Hash the new password
            admin.password = await bcrypt.hash(password, 10);
        }

        await admin.save();
        res.json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByIdAndDelete(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// controllers/adminController.js
// exports.getAllUsers = async (req, res) => {
//   try {
//     console.log("Fetching users...");
//     const users = await User.find();
//     console.log("Users fetched successfully:", users);
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);  // This should log the error
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };





