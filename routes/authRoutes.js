const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validate } = require('../middlewares/validateRequest');
const { signupSchema, loginSchema } = require('../validator/authValidator');


router.post('/test', (req, res) => {
  console.log("✅ Test body:", req.body);
  res.json({ received: req.body });
});

router.post('/signup', validate(), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
