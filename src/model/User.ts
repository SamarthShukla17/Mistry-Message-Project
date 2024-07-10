// import mongoose, {Schema, Document} from "mongoose";



// export interface Message extends Document{
//     content: string;
//     createdAt: Date;
//     _id: string 
// }

// const MessageSchema: Schema<Message> = new Schema({
//     content: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         required: true,
//         default: Date.now
//     }
// })

// export interface User extends Document{
//     username: string;
//     email: string;
//     password: string;
//     verifyCode: string;
//     verifyCodeExpiry: Date;
//     isVerified: boolean;
//     isAcceptingMessage: boolean;
//     messages: Message[] 
// }

// const UserSchema: Schema<User> = new Schema({
//     username: {
//         type: String,
//         required: [true, "Username is required"],
//         trim: true,
//         unique: true,
//         index: true
//     },
//     email: {
//         type: String,
//         required: [true, "email is required"],
//         unique: true,
//         match: [/.+\@.+\..+/, 'please use a valid email address'],
//     },
//     password: {
//         type: String,
//         required: [true, "password is required"],
//     },
//     verifyCode: {
//         type: String,
//         required: [true, "verify code is required"],
//     },
//     verifyCodeExpiry: {
//         type: Date,
//         required: [true, "verify code expiry is required"],
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     isAcceptingMessage: {
//         type: Boolean,
//         default: true,
//     },
//     messages: [MessageSchema]
// })


// const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

// export default UserModel;

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Message interface
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

// Define the Message schema
const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Define the User interface
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Define the User schema
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  verifyCode: {
    type: String,
    required: false
  },
  verifyCodeExpiry: {
    type: Date,
    required: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true
  },
  messages: [MessageSchema]
});

// Define the User model
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
