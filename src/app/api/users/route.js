// src/app/api/users/route.js

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Name, email and password are required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("users");

    // Check if email already exists
    const existingUser = await collection.findOne({ email: body.email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const result = await collection.insertOne({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      is_verified: false,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: result.insertedId,
          name: body.name,
          email: body.email,
        },
      }),
      { status: 201 }
    );
    
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // ?id=userId

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("users");

    if (id) {
      // Get user by ID
      const user = await collection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      // Get all users
      const users = await collection.find({}).toArray();
      return new Response(JSON.stringify(users), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
