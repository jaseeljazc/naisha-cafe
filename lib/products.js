import { ObjectId } from "mongodb";
import { getDb } from "./mongodb.js";

export async function getProducts() {
  try {
    const db = await getDb();
    const products = await db
      .collection("products")
      .find({})
      .sort({ category: 1, name: 1 })
      .toArray();

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
  } catch (error) {
    throw new Error(`Failed to load products: ${error.message}`);
  }
}

export async function createProduct(data) {
  try {
    const db = await getDb();
    const newProduct = {
      name: data.name.trim(),
      description: data.description ? data.description.trim() : "",
      price: Number(data.price),
      category: data.category,
      imageUrl: data.imageUrl ? data.imageUrl.trim() : "",
      isSpecial: Boolean(data.isSpecial),
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);
    return {
      ...newProduct,
      _id: result.insertedId.toString(),
    };
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
}

export async function updateProduct(id, data) {
  try {
    const db = await getDb();
    const updateFields = {};

    if (data.name !== undefined) updateFields.name = data.name.trim();
    if (data.description !== undefined) {
      updateFields.description = data.description.trim();
    }
    if (data.price !== undefined) updateFields.price = Number(data.price);
    if (data.category !== undefined) updateFields.category = data.category;
    if (data.imageUrl !== undefined) {
      updateFields.imageUrl = data.imageUrl.trim();
    }
    if (data.isSpecial !== undefined) {
      updateFields.isSpecial = Boolean(data.isSpecial);
    }

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    const updated = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!updated) {
      throw new Error("Product not found.");
    }

    return {
      ...updated,
      _id: updated._id.toString(),
    };
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

export async function deleteProduct(id) {
  try {
    const db = await getDb();
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    return { ok: result.deletedCount > 0 };
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}
