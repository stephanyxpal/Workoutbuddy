import User from '../models/user.js';
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
        createdAt: Date;
    }
}
interface LoginUserArgs {
    email: string;
    password: string;
}

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            const { user } = context;
            if (!user) {
                throw new AuthenticationError('Not logged in');
            }
            return User.findOne({ _id: user._id })
                .select('-__v -password');
        },
    },
    Mutation: {
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });
            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            // Sign a token with the user's information
            const token = signToken(user.firstName, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });
            console.log('Input received:', input); // Debug input


            // Sign a token with the user's information
            const token = signToken(user.firstName, user.email, user._id);

            // Return the token and the user
            return { token, user };
        },
    }

};

export default resolvers;