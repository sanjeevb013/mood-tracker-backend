const express = require('express');
const cors = require('cors');

// Routes
const moodRoutes = require('./routes/moodRouters');
const authRoutes = require('./routes/authRoutes');

// Middleware
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleWare');

const app = express();
app.use(cors()); // enable CORS for frontend requests
app.use(express.json()); // parse JSON request bodies



// Routes
app.use('/api/moods',authMiddleware, moodRoutes);   // moods-related routes
app.use('/api/auth', authRoutes);   // authentication routes

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Body:", req.body);
  next();
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
