import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth.js";
import { getProducts } from "@/lib/products.js";
import ProductTable from "@/components/admin/ProductTable.js";
import AddProductDialog from "@/components/admin/AddProductDialog.js";
import LogoutButton from "@/components/admin/LogoutButton.js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu Management — Kettle & Crumb Admin",
  description: "Add, edit, and manage menu items.",
};

export default async function AdminDashboard() {
  const authed = await isAdmin();
  if (!authed) {
    redirect("/admin/login");
  }

  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    products = [];
  }

  return (
    <main className="min-h-screen bg-paper text-ink p-6 md:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl md:text-4xl text-ink">
                Menu management
              </h1>
            </div>
            <p className="text-sm text-muted mt-1">
              Add new items, adjust prices, or mark daily specials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-4"
            >
              View live site
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Action bar and summary */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {products.length} {products.length === 1 ? "item" : "items"} in menu
          </p>
          <AddProductDialog />
        </div>

        {/* Product Table */}
        <ProductTable products={products} />
      </div>
    </main>
  );
}
