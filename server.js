// Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const achievementRoutes = require('./routes/achievements');
const contactRoutes = require('./routes/contact');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);

// Public routes matching the frontend API calls
app.use('/api/public/projects', require('./routes/public/projects'));
app.use('/api/public/skills', require('./routes/public/skills'));
app.use('/api/public/achievements', require('./routes/public/achievements'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});