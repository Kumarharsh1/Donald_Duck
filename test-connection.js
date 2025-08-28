// test-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log(`Connection string: ${process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')}`);
    
    // Remove deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Rest of your test code remains the same...
    const Test = mongoose.model('Test', new mongoose.Schema({ 
      name: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }));
    
    const testDoc = await Test.create({ name: 'Connection Test' });
    console.log('✅ SUCCESS: Can write to database');
    console.log(`Created test document with ID: ${testDoc._id}`);
    
    const foundDoc = await Test.findById(testDoc._id);
    console.log('✅ SUCCESS: Can read from database');
    console.log(`Retrieved document: ${foundDoc.name}`);
    
    await Test.deleteOne({ _id: testDoc._id });
    console.log('✅ SUCCESS: Cleanup completed');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📋 Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    console.log('\n🎉 All tests passed! MongoDB Atlas connection is working perfectly!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR: Failed to connect to MongoDB Atlas');
    console.error(`Error message: ${error.message}`);
    
    if (error.name === 'MongoServerError') {
      console.error('MongoDB Server Error:', error.code);
    } else if (error.name === 'MongooseServerSelectionError') {
      console.error('Network connection error - check your IP whitelisting in MongoDB Atlas');
    }
    
    process.exit(1);
  }
};

if (require.main === module) {
  testConnection();
}

module.exports = testConnection;