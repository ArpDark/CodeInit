import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
// import "./prism-vsc-dark-plus.css";

import { cn } from "@/lib/utils";
// const inter = Inter({ subsets: ["latin"] });
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CodeInit",
  description: "A Code editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}
