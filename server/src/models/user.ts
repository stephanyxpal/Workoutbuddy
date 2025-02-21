import { Schema, model,type Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName:string;
  lastName:string;
  password:string;
  email:string;
  city:string;
  age?:number;
  weight?:number;
  height?:number;
  gender?:String;
  createdAt:Date;
}

const UserSchema = new Schema<UserDocument>({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
   type:String,
    required:true,
  },
  password:{
    type:String,
    required:true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  age: { 
    type: Number 
  },
  weight: { 
    type: Number
  },  
  height: { 
    type: Number 
  }, 
  gender: {
     type: String, 
     enum: ["Male", "Female", "Other"]
     },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const User = model('User',UserSchema)
export default User;
