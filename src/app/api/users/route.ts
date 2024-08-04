import { NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';

// Ensure you handle undefined URI properly
const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
}

const client = new MongoClient(uri);

async function connectToDatabase(): Promise<Db> {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Access the database and return it
        return client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

export async function GET(request: Request) {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        
        // Perform your database operations here
        const users = await usersCollection.find().toArray();
        
        return NextResponse.json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.error();
    }
}
