import { cookies } from "next/headers";

export const COOKIE_NAME = "cafe_admin";

export async function isAdmin() {
  const store = await cookies();
  const cookieValue = store.get(COOKIE_NAME)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) return false;
  return cookieValue === adminPassword;
}
