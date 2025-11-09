import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kitten Library",
  description:
    "Tempat baca buku lucu bertema kittens dalam nuansa lembut malam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-[#1a1425] via-[#231b33] to-[#1c1a24] text-pink-100`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
