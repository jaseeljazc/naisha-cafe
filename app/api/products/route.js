import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth.js";
import { getProducts, createProduct } from "@/lib/products.js";

const ALLOWED_CATEGORIES = ["Coffee", "Tea", "Pastries", "Food"];

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not retrieve products." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authed = await isAdmin();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, category, imageUrl, isSpecial } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Item name is required." },
        { status: 400 }
      );
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}.` },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      description: description || "",
      price: numericPrice,
      category,
      imageUrl: imageUrl || "",
      isSpecial: Boolean(isSpecial),
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not create product." },
      { status: 500 }
    );
  }
}
