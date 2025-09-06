const User = require('../models/User');

const getProfile = async (req, res, next) => {
  console.log('🔍 Request Params:', req.params.userId);
const userId= req.params.userId
try{
    const user = await User.findById(userId).select('-password'); // exclude sensitive fields
    if (!user) return res.status(404).json({ message: 'User not found' });

res.json(user);
  } catch (error) {
    next(error)
  }
};

const updateProfile = async(req, res, next)=>{
    try{
        const userId = req.params.userId;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId,updates,{new:true, runValidators:true}).select('-password');
          if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }

    }

module.exports = { getProfile, updateProfile};