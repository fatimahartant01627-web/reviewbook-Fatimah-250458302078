"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registrasi gagal");
        return;
      }

      router.push("/auth/login?registered=true");
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1425] via-[#231b33] to-[#1c1a24] text-pink-100 relative overflow-hidden">
      {/* glowing background blobs */}
      <div className="absolute -top-10 -left-10 h-48 w-48 bg-pink-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-10 h-60 w-60 bg-purple-400/20 rounded-full blur-3xl" />

      <div className="max-w-md w-full space-y-8 z-10 bg-[#1f1b28]/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-pink-200/10">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-pink-200 drop-shadow-[0_0_10px_rgba(255,192,203,0.25)]">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-pink-300/80">
            Atau{" "}
            <Link
              href="/auth/login"
              className="font-medium text-rose-300 hover:text-pink-200 transition-colors"
            >
              login ke akun yang sudah ada
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-rose-900/30 p-3 border border-rose-400/30">
              <p className="text-sm text-rose-200">{error}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-pink-300/30 placeholder-pink-200/50 bg-[#2a2435]/60 text-pink-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-pink-300/30 placeholder-pink-200/50 bg-[#2a2435]/60 text-pink-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-pink-300/30 placeholder-pink-200/50 bg-[#2a2435]/60 text-pink-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                placeholder="Password (minimal 6 karakter)"
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-pink-300/30 placeholder-pink-200/50 bg-[#2a2435]/60 text-pink-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
                placeholder="Konfirmasi password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#1a1425] bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 hover:from-pink-400 hover:via-rose-400 hover:to-amber-300 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-pink-300 hover:text-pink-100 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
