import { Schema, model, type Document } from 'mongoose';

interface IWorkout extends Document {
    userId: Schema.Types.ObjectId;  // Link to User
    workoutType: string;            // e.g., Running, Yoga, Weightlifting
    duration: number;               // Duration in minutes
    caloriesBurned?: number;        // Optional: Calories burned
    date: Date;                     // Date of workout
    repetitions?: number;           // Optional: For strength training
    sets?: number;                  // Optional: Number of sets
    weightUsed?: number;            // Optional: Weight used (for lifting)
    createdAt: Date;
    updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        workoutType: { type: String, required: true, trim: true },
        duration: { type: Number, required: true },
        caloriesBurned: { type: Number, default: 0 },  // 🔹 Default value prevents undefined issues
        date: { type: Date, required: true, default: () => new Date() }, // 🔹 Ensures correct UTC time
        repetitions: { type: Number, default: 0 },
        sets: { type: Number, default: 0 },
        weightUsed: { type: Number, default: 0 },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } } // ✅ Tracks timestamps
);

const Workout = model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
