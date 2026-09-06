"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import EditProductDialog from "./EditProductDialog.js";
import DeleteConfirmDialog from "./DeleteConfirmDialog.js";
import { formatPrice } from "@/lib/utils.js";

export default function ProductTable({ products = [] }) {
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleToggleSpecial(product) {
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSpecial: !product.isSpecial }),
      });
      if (res.ok) {
        toast.success("Item saved");
        router.refresh();
      } else {
        toast.error("Failed to update item.");
      }
    } catch {
      toast.error("Failed to connect to the server.");
    }
  }

  async function handleDelete() {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${deletingProduct._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Item deleted");
        setDeletingProduct(null);
        router.refresh();
      } else {
        toast.error("Failed to delete item.");
      }
    } catch {
      toast.error("Failed to connect to the server.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto border border-line rounded-lg bg-milk">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper border-b border-line text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Special</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-paper/40">
                <td className="px-4 py-3 font-medium text-ink">
                  <div className="flex items-center gap-3">
                    {item.imageUrl ? (
                      <div className="relative size-9 rounded-sm overflow-hidden border border-line shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="36px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="size-9 rounded-sm border border-line/60 bg-paper/60 shrink-0" />
                    )}
                    <div>
                      <div>{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-muted truncate max-w-xs">{item.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{item.category}</td>
                <td className="px-4 py-3 tabular-nums text-ink font-medium">
                  {formatPrice(item.price)}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleToggleSpecial(item)}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {item.isSpecial ? (
                      <span className="text-ochre">[special]</span>
                    ) : (
                      <span className="text-muted/60">—</span>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => setEditingProduct(item)} title="Edit item">
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => setDeletingProduct(item)} title="Delete item" className="text-[#9E2A2B] hover:text-[#9E2A2B]">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditProductDialog
        product={editingProduct}
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
      />

      <DeleteConfirmDialog
        product={deletingProduct}
        isOpen={Boolean(deletingProduct)}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
}
