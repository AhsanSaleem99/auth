import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env",
  );
}

// 1. Mongoose ki built-in types ke sath global scope tight map karein
declare global {
  var mongooseConnection:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

// 2. Variable name change kiya taake koi conflict na ho
let cached = globalThis.mongooseConnection;

if (!cached) {
  cached = globalThis.mongooseConnection = { conn: null, promise: null };
}

const connectDB = async (): Promise<Mongoose> => {
  // If connection already exists, return it instantly
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // mongoose.connect ka return type strict promise<Mongoose> hota hai
    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log(
          "Connected to MongoDB successfully (New Connection Created)",
        );
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
};

export default connectDB;
