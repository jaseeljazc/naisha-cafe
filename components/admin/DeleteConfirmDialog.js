"use client";

import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog.jsx";

export default function DeleteConfirmDialog({
  product,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="bg-milk border-line sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{product?.name}&rdquo;?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-[#9E2A2B] text-milk hover:bg-[#9E2A2B]/90 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
