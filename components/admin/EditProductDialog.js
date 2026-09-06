"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import ProductForm from "./ProductForm.js";

export default function EditProductDialog({ product, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-milk border-line sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
          <DialogDescription>
            Update details for this menu item.
          </DialogDescription>
        </DialogHeader>
        {product && (
          <ProductForm
            key={product._id}
            product={product}
            onSuccess={onClose}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
