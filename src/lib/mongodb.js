// src/lib/mongodb.js
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

// MongoDB client
const client = new MongoClient(process.env.MONGODB_URI);

// MongoDB connection promise
const clientPromise = client.connect();

export default clientPromise;
