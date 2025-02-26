import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server'; 
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';    
import User from './models/user.js';

dotenv.config(); // Load environment variables

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Apollo Server
const server = new ApolloServer({ 
    typeDefs,
    resolvers
}); 

const startApolloServer = async () => {
    await server.start();

    const PORT = process.env.PORT || 3001; // Port for API server
    const app = express(); // Create Express server

    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
    app.use(express.json()); // Parse JSON bodies

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => {
            const user = authenticateToken({ req });
            return { user }; // Accessible in GraphQL resolvers
        }
    }));

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist'))); // Serve static files   

        app.get('*', (_req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html')); // Send index.html for any other requests
        });
    }

    db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Log MongoDB connection error
    db.once('open', () => console.log('Connected to MongoDB')); // Log MongoDB connection success

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();