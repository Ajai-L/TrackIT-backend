
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/assignment-tracking';
    console.log('Connecting to MongoDB:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    
    const users = await User.find();
    console.log(`\n✅ Found ${users.length} users in database`);
    
    if (users.length > 0) {
      console.log('\nUsers in database:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - ID: ${user._id}`);
      });
    } else {
      console.log('⚠️  No users found in database');
    }
    
    const testUser = await User.findOne({ email: 'test@example.com' });
    if (testUser) {
      console.log('\n✅ Test user found:', testUser);
    } else {
      console.log('\n⚠️  No test user found with email: test@example.com');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
};

connectDB();
