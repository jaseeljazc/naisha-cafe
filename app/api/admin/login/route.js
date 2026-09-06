import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword || password !== expectedPassword) {
      return NextResponse.json(
        { error: "That password is not correct." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, expectedPassword, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not process login request." },
      { status: 500 }
    );
  }
}
