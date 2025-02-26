import User from '../models/user.js';
import Workout from '../models/workout.js';
import Goal from '../models/goal.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface AddUserArgs {
    input: {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        city: string;
        age: number;
        weight: number;
        height: number;
        gender: string;
    };
}

interface LoginUserArgs {
    email: string;
    password: string;
}

const resolvers = {
    Query: {
        // 🔐 Protected Query: Fetch logged-in user profile
        me: async (_parent: any, _args: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to view this information.');
            }
            return await User.findById(context.user._id).select('-__v -password');
        },

        // 🔐 Protected Query: Fetch workouts for logged-in user
        workouts: async (_parent: any, _args: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            return await Workout.find({ userId: context.user._id });
        },

        // 🔐 Protected Query: Fetch fitness goals for logged-in user
        goals: async (_parent: any, _args: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            return await Goal.find({ userId: context.user._id });
        }
    },

    Mutation: {
        // ✅ User Login
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid email or password.');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid email or password.');
            }

            const token = signToken(user.firstName, user.email, user._id);
            return { token, user };
        },

        // ✅ Register a new user
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const existingUser = await User.findOne({ email: input.email });
            if (existingUser) {
                throw new AuthenticationError('User already exists');
            }

            const user = await User.create(input);
            const token = signToken(user.firstName, user.email, user._id);

            return { token, user };
        },

        // 🔐 Update User Profile
        updateProfile: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to update your profile.');
            }
            return await User.findByIdAndUpdate(context.user._id, input, { new: true }).select('-__v -password');
        },

        // 🔐 Delete User Account
        deleteUser: async (_parent: any, _args: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to delete your account.');
            }
            await User.findByIdAndDelete(context.user._id);
            return true;
        },

        // 🏋️‍♂️ Add a Workout
        addWorkout: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            return await Workout.create({ ...input, userId: context.user._id });
        },

        // 🏋️‍♂️ Delete a Workout
        deleteWorkout: async (_parent: any, { id }: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            const workout = await Workout.findById(id);
            if (!workout || workout.userId.toString() !== context.user._id) {
                throw new AuthenticationError('Unauthorized');
            }
            await Workout.findByIdAndDelete(id);
            return true;
        },

        // 🎯 Add a Fitness Goal
        addGoal: async (_parent: any, { input }: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            return await Goal.create({ ...input, userId: context.user._id, progress: 0, completed: false });
        },

        // 🎯 Delete a Fitness Goal
        deleteGoal: async (_parent: any, { id }: any, context: any) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            const goal = await Goal.findById(id);
            if (!goal || goal.userId.toString() !== context.user._id) {
                throw new AuthenticationError('Unauthorized');
            }
            await Goal.findByIdAndDelete(id);
            return true;
        }
    }
};

export default resolvers;
