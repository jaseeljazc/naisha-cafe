"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button.jsx";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="border-line text-ink hover:bg-paper cursor-pointer"
    >
      {isLoggingOut ? "Logging out..." : "Log out"}
    </Button>
  );
}
