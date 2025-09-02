// admin-setup.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const promoteToAdmin = async () => {
  try {
    // Get email from command-line arguments
    const userEmail = process.argv[2];
    if (!userEmail) {
      console.error('❌ Please provide an email: node promote-to-admin.js <email>');
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Promote user to admin
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      if (user.role === 'admin') {
         console.log('✅ User promoted to admin successfully!');
        console.log(`Email: ${user.email}`);
        console.log(`Role: ${user.role}`);
      } 
    } else {
      console.log('❌ User not found with email:', userEmail);
      console.log('Available users:');
      const allUsers = await User.find({}, 'email name role');
      console.log(allUsers);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

promoteToAdmin();
