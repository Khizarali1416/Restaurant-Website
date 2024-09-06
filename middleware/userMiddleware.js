// backend/middleware/userMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify if the user is authenticated
const verifyUser = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      console.log("token", token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded)
      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        throw new Error('User not found.');
      }
      console.log("user", user)
  
      const tokenExists = user.tokens.some((t) => t.token === token);
      if (!tokenExists) {
        throw new Error('Token not matching.');
      }
      console.log("existingtoken", tokenExists)
  
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate as user.' });
    }
  };
  

module.exports = verifyUser;
