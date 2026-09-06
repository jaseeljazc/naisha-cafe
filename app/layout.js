import { Instrument_Serif, Karla } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const karla = Karla({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Kettle & Crumb — Café & Bakery",
  description: "Slow coffee and warm bread, since 2019.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${karla.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
