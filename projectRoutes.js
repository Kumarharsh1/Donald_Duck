const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (featured) {
      filter.featured = featured === 'true';
    }
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new project (protected route - add authentication middleware later)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubLink,
      liveDemoLink,
      imageUrl,
      category,
      featured
    } = req.body;

    const newProject = new Project({
      title,
      description,
      technologies,
      githubLink,
      liveDemoLink,
      imageUrl,
      category,
      featured
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a project (protected route)
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubLink,
      liveDemoLink,
      imageUrl,
      category,
      featured
    } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        technologies,
        githubLink,
        liveDemoLink,
        imageUrl,
        category,
        featured,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a project (protected route)
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;