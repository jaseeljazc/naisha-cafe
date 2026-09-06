"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import ProductForm from "./ProductForm.js";

export default function AddProductDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-leaf text-milk hover:bg-leaf/90 cursor-pointer"
      >
        Add item
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-milk border-line sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add item</DialogTitle>
            <DialogDescription>
              Add a new item to the café menu.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            onSuccess={() => setIsOpen(false)}
            onCancel={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
