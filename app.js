const express = require('express');
const app = express();
const moodRoutes = require('./routes/moodRouters');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api', moodRoutes);
app.use(errorHandler);

module.exports = app;