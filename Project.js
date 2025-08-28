const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  githubLink: {
    type: String,
    default: ''
  },
  liveDemoLink: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'data-science', 'machine-learning', 'other'],
    default: 'web'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);