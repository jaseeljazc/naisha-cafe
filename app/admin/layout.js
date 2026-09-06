import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth.js";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  const authed = await isAdmin();
  if (!authed) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
