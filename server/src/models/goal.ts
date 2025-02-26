import { Schema, model, type Document } from 'mongoose';

interface IGoal extends Document {
  userId: Schema.Types.ObjectId;  // Link to User
  goalText: string; // Aligns with GraphQL schema
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed';  
  priority: 'Low' | 'Medium' | 'High';              
  targetDate?: Date;  // Aligns with GraphQL schema
  startDate: Date;
  progress: number;   // Tracks goal progress (0-100)
  completed: boolean; // True if goal is achieved
  createdAt: Date;
  }

  const GoalSchema = new Schema<IGoal>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        goalText: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        status: { 
            type: String, 
            enum: ['Pending', 'In Progress', 'Completed'], 
            default: 'Pending' 
        },
        priority: { 
            type: String, 
            enum: ['Low', 'Medium', 'High'], 
            default: 'Medium' 
        },
        targetDate: { type: Date, required: false },
        startDate: { type: Date, required: true, default: Date.now },
        progress: { type: Number, required: true, default: 0 }, // Track % completion
        completed: { type: Boolean, required: true, default: false }, // Mark if achieved
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  );

const Goal = model<IGoal>('Goal',GoalSchema);
export default Goal;
