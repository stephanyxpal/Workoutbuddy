import { Schema, model,type Document } from 'mongoose';

interface IGoal extends Document {
    title: string;
    description?: string;
    status: string;
    priority: string
    dueDate: Date;
    createdAt: Date;
  }

  const GoalSchema = new Schema<IGoal>(
    {
      title: { 
        type: String,
         required: true, 
         trim: true },
      description: { 
        type: String, 
        trim: true },
      status: { 
        type: String
      },
      priority: { 
        type: String
      },
      dueDate: { type: Date,
         required: true },
      createdAt: { type: Date,
         default: Date.now },
    },
    { timestamps: true }
  );

const Goal = model('Goal',GoalSchema)
export default Goal;
