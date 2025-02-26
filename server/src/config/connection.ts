import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workoutbuddy';

// 🔥 NEW: Add logging to confirm connection status
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB:', MONGODB_URI))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

export default mongoose.connection;
