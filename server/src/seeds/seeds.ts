import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Workout from '../models/workout.js';
import Goal from '../models/goal.js';
import bcrypt from 'bcrypt';

dotenv.config(); // Load environment variables

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workoutbuddy';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB for seeding'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Sample Users
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    city: 'New York',
    age: 25,
    weight: 75,
    height: 180,
    gender: 'Male',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password123', 10),
    city: 'Los Angeles',
    age: 30,
    weight: 65,
    height: 170,
    gender: 'Female',
  }
];

// Sample Workouts
const workouts = [
  {
    workoutType: 'Running',
    duration: 45,
    caloriesBurned: 400,
    date: new Date(),
    repetitions: 0,
    sets: 0,
    weightUsed: 0,
  },
  {
    workoutType: 'Cycling',
    duration: 60,
    caloriesBurned: 500,
    date: new Date(),
    repetitions: 0,
    sets: 0,
    weightUsed: 0,
  }
];

// Sample Goals
const goals = [
  {
    goalText: 'Run 10 miles a week',
    targetDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
    startDate: new Date(),
    progress: 0,
    completed: false,
  },
  {
    goalText: 'Lose 5 pounds',
    targetDate: new Date(new Date().setDate(new Date().getDate() + 60)), // 60 days from now
    startDate: new Date(),
    progress: 0,
    completed: false,
  }
];

// Seed Database
const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Goal.deleteMany({});

    console.log('🗑️ Cleared old data');

    const createdUsers = await User.insertMany(users);
    console.log('✅ Users added:', createdUsers.length);

    const workoutsWithUser = workouts.map(workout => ({
      ...workout,
      userId: createdUsers[0]._id // Assigning workouts to first user
    }));

    const goalsWithUser = goals.map(goal => ({
      ...goal,
      userId: createdUsers[0]._id // Assigning goals to first user
    }));

    await Workout.insertMany(workoutsWithUser);
    console.log('✅ Workouts added:', workoutsWithUser.length);

    await Goal.insertMany(goalsWithUser);
    console.log('✅ Goals added:', goalsWithUser.length);

    console.log('🎉 Database seeding complete!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding script
seedDatabase();
