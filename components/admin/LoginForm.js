"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "That password is not correct.");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Failed to connect to the server.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm bg-milk border-line">
      <CardHeader className="space-y-1">
        <CardTitle className="font-display text-2xl text-ink">
          Admin login
        </CardTitle>
        <CardDescription className="text-muted text-sm">
          Enter the admin password to manage the café menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-ink">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="bg-milk border-line text-ink"
            />
          </div>

          {error && (
            <p className="text-sm text-[#9E2A2B] font-medium" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-leaf text-milk hover:bg-leaf/90"
          >
            {isLoading ? "Signing in..." : "Log in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
