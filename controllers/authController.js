const User = require('../models/User.js');
const { generateTokens } = require('../services/tokenServices.js');

const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      password,
      address
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !country || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      password,
      address
    });

    // Generate tokens
    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (err) {
    next(err); // handled by error middleware
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      ...tokens
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
