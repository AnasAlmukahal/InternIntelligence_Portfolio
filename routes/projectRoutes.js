const express = require('express');
const router = express.Router();
const Project = require('../models/projects'); // Make sure this model exists

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
