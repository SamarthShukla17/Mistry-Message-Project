import { MongoClient } from 'mongodb';

// Ensure you handle undefined URI properly
const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined.');
}

const client = new MongoClient(uri, {
    // No deprecated options
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

export { client, connectToDatabase };
