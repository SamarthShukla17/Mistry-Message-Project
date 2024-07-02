import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.error("MONGODB_URI environment variable is not defined in .env.local");
        process.exit(1);
    }

    try {
        const db = await mongoose.connect(MONGODB_URI, {});

        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("Database Connection failed", error);
        process.exit(1);
    }
}

export default dbConnect;
