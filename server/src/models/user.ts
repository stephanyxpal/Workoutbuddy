import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
  createdAt?: Date;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must be a valid email!']
  },
  password: { type: String, required: true },
  city: { type: String },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  createdAt: { type: Date, default: Date.now }
},

  {
    toJSON: { virtuals: true },
    timestamps: true,
  });

// ✅ Hash password before saving
userSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// ✅ Compare passwords for login
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("goals", {
  ref: 'Goal',
  localField: '_id',
  foreignField: 'userId',
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = model<UserDocument>('User', userSchema);
export default User;
