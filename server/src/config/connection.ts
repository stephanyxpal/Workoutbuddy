import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workoutbuddy';

console.log("🔍 Using MONGODB_URI:", MONGODB_URI); 

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB:', MONGODB_URI))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

export default mongoose.connection;
