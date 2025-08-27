// src/app/api/products/route.js

export const dynamic = "force-dynamic";

import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET all products
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // ?id=productId

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("products");

    if (id) {
      // Get product by ID (details)
      const product = await collection.findOne({ _id: new ObjectId(id) });
      if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
      return new Response(JSON.stringify(product), { status: 200 });
    } else {
      // Get all products
      const products = await collection.find({}).toArray();
      return new Response(JSON.stringify(products), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST create new product
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("products");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, product: result }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT update/edit product
export async function PUT(req) {
  try {
    const body = await req.json(); // include { id, ...fieldsToUpdate }
    if (!body.id) return new Response(JSON.stringify({ error: "Product ID required" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("products");

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(body.id) },
      { $set: body },
      { returnDocument: "after" }
    );

    if (!result.value) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify({ success: true, product: result.value }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE product
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id"); // ?id=productId
    if (!id) return new Response(JSON.stringify({ error: "Product ID required" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("products");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
