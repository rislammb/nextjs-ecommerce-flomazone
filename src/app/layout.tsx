import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/Navabr";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flomazon",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="m-auto min-h-screen  min-w-[300px] max-w-7xl p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
