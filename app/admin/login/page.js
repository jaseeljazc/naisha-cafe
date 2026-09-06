import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm.js";

export const metadata = {
  title: "Admin Login — Kettle & Crumb",
  description: "Sign in to manage the menu items.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <LoginForm />
        <p className="text-center text-sm text-muted">
          <Link
            href="/"
            className="hover:text-ink transition-colors underline underline-offset-4 focus-visible:outline-leaf"
          >
            Back to homepage
          </Link>
        </p>
      </div>
    </main>
  );
}
