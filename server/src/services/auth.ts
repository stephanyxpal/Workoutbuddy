import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
const TOKEN_EXPIRATION = '7d';

// Generate JWT Token
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

// Authenticate JWT Token (For GraphQL Context)
export const authenticateToken = ({ req }: any) => {
  let token = req.headers.authorization || req.body.token || req.query.token;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim();
  }

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    return decoded.data; // Return the user payload (not modifying req)
  } catch (err) {
    if (err instanceof Error) {
      console.log('Invalid token:', err.message);
    } else {
      console.log('Invalid token:', err);
    }
    return null;
  }
};

// Custom GraphQL Authentication Error
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}
