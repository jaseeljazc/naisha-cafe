import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth.js";
import { updateProduct, deleteProduct } from "@/lib/products.js";

const ALLOWED_CATEGORIES = ["Coffee", "Tea", "Pastries", "Food"];

export async function PUT(request, { params }) {
  try {
    const authed = await isAdmin();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, price, category, imageUrl, isSpecial } = body;

    const updateData = {};
    if (name !== undefined) {
      if (!name.trim()) {
        return NextResponse.json(
          { error: "Item name cannot be empty." },
          { status: 400 }
        );
      }
      updateData.name = name;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        return NextResponse.json(
          { error: "Price must be a positive number." },
          { status: 400 }
        );
      }
      updateData.price = numericPrice;
    }

    if (category !== undefined) {
      if (!ALLOWED_CATEGORIES.includes(category)) {
        return NextResponse.json(
          {
            error: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}.`,
          },
          { status: 400 }
        );
      }
      updateData.category = category;
    }

    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isSpecial !== undefined) updateData.isSpecial = Boolean(isSpecial);

    const product = await updateProduct(id, updateData);
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const authed = await isAdmin();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await deleteProduct(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete product." },
      { status: 500 }
    );
  }
}
