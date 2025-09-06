const express = require('express');
const cors = require('cors');

// Routes
const moodRoutes = require('./routes/moodRouters');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Middleware
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleWare');

const app = express();
app.use(cors()); // enable CORS for frontend requests
app.use(express.json()); // parse JSON request bodies



// Routes
app.use('/api/moods', moodRoutes);   // moods-related routes
app.use('/api/auth', authRoutes);   // authentication routes
app.use('/api/profile',profileRoutes);   // profile routes

app.use((req, res, next) => {
  console.log("Incoming request:", req.method);
  console.log("Body:", req);
  next();
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
