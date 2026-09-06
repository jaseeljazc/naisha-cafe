import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (uri) {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export async function getDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in environment variables.");
  }
  if (!clientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
    global._mongoClientPromise = clientPromise;
  }
  const connected = await clientPromise;
  return connected.db("cafe");
}
