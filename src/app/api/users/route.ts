// api/users.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import UserModel, { User } from '@/model/User'; // Import User interface if defined separately

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect('mongodb+srv://Samarth:sam@cluster0.mongodb.net/myDatabase');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting MongoDB:', error);
    process.exit(1);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | { success: boolean; message: string }>) {
  if (req.method === 'GET') {
    await connectDB();

    try {
      const users = await UserModel.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
