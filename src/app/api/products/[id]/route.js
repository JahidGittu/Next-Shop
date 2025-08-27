// src/app/api/products/[id]/route.js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    // req.nextUrl থেকে id বের করা
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // URL থেকে [id] last part

    if (!id) return new Response(JSON.stringify({ error: "Product ID required" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("nextshop");
    const collection = db.collection("products");

    const product = await collection.findOne({ _id: new ObjectId(id) });
    if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
