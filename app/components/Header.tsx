"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const AuthButtons = () => {
    if (loading) return <span>Cargando...</span>;

    if (user) {
      return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <span className="font-medium">Hola, {user.name}</span>
          {user.role === "admin" && (
            <Link
              href="/dashboard"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col md:flex-row gap-2">
          <Link
            href="/login"
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 hover:scale-105 transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 rounded-lg bg-white text-blue-600 font-semibold border border-blue-500 shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-300 flex items-center justify-center"
          >
            Registrarse
          </Link>
        </div>
      );
    }
  };

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.PNG"
            alt="PetAdopt Logo"
            width={55}
            height={55}
          />
          <span className="text-2xl font-bold">PetAdopt</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-200 transition">Inicio</Link>
          <Link href="/pets" className="hover:text-blue-200 transition">Mascotas</Link>
          <Link href="/about" className="hover:text-blue-200 transition">Sobre Nosotros</Link>
          <AuthButtons />
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-blue-600 px-4 py-3 flex flex-col gap-4">
          <Link href="/" className="hover:text-blue-200 transition" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/pets" className="hover:text-blue-200 transition" onClick={() => setMenuOpen(false)}>Mascotas</Link>
          <Link href="/about" className="hover:text-blue-200 transition" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
          <AuthButtons />
        </nav>
      )}
    </header>
  );
}
