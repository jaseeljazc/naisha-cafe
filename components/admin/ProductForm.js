"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Label } from "@/components/ui/label.jsx";

const CATEGORIES = ["Coffee", "Tea", "Pastries", "Food"];

export default function ProductForm({ product, onSuccess, onCancel }) {
  const router = useRouter();
  const isEditing = Boolean(product?._id);

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price !== undefined ? String(product.price) : "");
  const [category, setCategory] = useState(product?.category || "Coffee");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [isSpecial, setIsSpecial] = useState(Boolean(product?.isSpecial));
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEditing ? `/api/products/${product._id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: Number(price), category, imageUrl, isSpecial }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to save item.");
        setIsSaving(false);
        return;
      }

      toast.success("Item saved");
      router.refresh();
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Failed to connect to the server.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-name">Name</Label>
        <Input id="item-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cortado" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="item-price">Price (₹)</Label>
          <Input id="item-price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="140" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="item-category">Category</Label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-milk px-3 py-1 text-sm text-ink focus-visible:outline-leaf"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-desc">Description</Label>
        <Textarea id="item-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief one-line description" rows={2} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-image">Image URL (optional)</Label>
        <Input id="item-image" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input type="checkbox" id="item-special" checked={isSpecial} onChange={(e) => setIsSpecial(e.target.checked)} className="size-4 rounded border-line text-leaf cursor-pointer" />
        <Label htmlFor="item-special" className="text-sm font-normal cursor-pointer">
          Mark as daily special
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-line">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSaving} className="bg-leaf text-milk hover:bg-leaf/90 cursor-pointer">
          {isSaving ? "Saving..." : "Save item"}
        </Button>
      </div>
    </form>
  );
}
