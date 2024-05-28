const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching users from the database...');
    const users = await User.findAll();
    console.log('Users fetched successfully:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
};
