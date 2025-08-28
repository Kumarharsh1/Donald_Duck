const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

// Sample projects data
const sampleProjects = [
  {
    title: "Diabetes Prediction Web App",
    description: "Full-stack diabetes prediction application with secure login and real-time model predictions.",
    technologies: ["React", "Python", "Streamlit", "Machine Learning"],
    githubLink: "https://github.com/Kumarharsh1/diabetes-prediction",
    liveDemoLink: "https://6890c6b0ddf903296517c592--diabetescheckapp.netlify.app/",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "web",
    featured: true
  },
  {
    title: "Stock Market Signal Analyzer",
    description: "Interactive Streamlit app for identifying buy/sell signals using technical indicators.",
    technologies: ["Python", "Pandas", "Streamlit", "Data Analysis"],
    githubLink: "https://github.com/Kumarharsh1/stock-analyzer",
    liveDemoLink: "https://stock-market-predictor-4dp8c29i7nr5ebrebp28yt.streamlit.app/",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "data-science",
    featured: true
  },
  {
    title: "Chatopia Chatbot",
    description: "Falcon-RW-1B based AI chatbot built with Hugging Face Transformers and PyTorch.",
    technologies: ["Python", "PyTorch", "NLP", "Transformers"],
    githubLink: "https://github.com/Kumarharsh1/chatbot",
    liveDemoLink: "https://colab.research.google.com/drive/1k1MrIYjw7kNhrZOBVYlRcd4_wo5NNcjG",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "machine-learning",
    featured: false
  },
  {
    title: "Fraud Detection Application",
    description: "Web app that uses a pre-trained ML model to classify financial transactions.",
    technologies: ["Machine Learning", "Python", "Flask", "Data Science"],
    githubLink: "https://github.com/Kumarharsh1/fraud-detection",
    liveDemoLink: "https://fraud-detection-app-padv6u3p7gtqrehhjzv7dn.streamlit.app/",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "machine-learning",
    featured: true
  },
  {
    title: "Population Dashboard",
    description: "Interactive Tableau dashboard ranking capitals by population with filters.",
    technologies: ["Tableau", "Data Visualization", "Dashboard"],
    githubLink: "https://github.com/Kumarharsh1/population-dashboard",
    imageUrl: "https://images.unsplash.com/photo-1565073182885-20e1ee8f6c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "data-science",
    featured: false
  },
  {
    title: "Car Space Parking Detection",
    description: "Real-time parking space detection using the YOLO object-detection framework.",
    technologies: ["YOLO", "Computer Vision", "Python", "Deep Learning"],
    githubLink: "https://github.com/Kumarharsh1/parking-detection",
    imageUrl: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "machine-learning",
    featured: false
  }
];

// Database connection function (updated without deprecated options)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing projects
    const deleteResult = await Project.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing projects`);
    
    // Add sample projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`Added ${insertedProjects.length} sample projects successfully`);
    
    // Get count of projects
    const projectCount = await Project.countDocuments();
    console.log(`Total projects in database: ${projectCount}`);
    
    // Display added projects
    console.log('\n📋 Added Projects:');
    insertedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} (${project.category})`);
    });
    
    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProjects };