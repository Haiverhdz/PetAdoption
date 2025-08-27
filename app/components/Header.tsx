"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log("SESSION:", session);
  const pathname = usePathname();
  

  const closeMenu = () => setMenuOpen(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      onClick={closeMenu}
      className={`transition ${
        pathname === href ? "text-yellow-300 font-semibold" : "hover:text-blue-200"
      }`}
    >
      {children}
    </Link>
  );

  const AuthButtons = () => {
    if (status === "loading") return <span>Cargando...</span>;

    if (session?.user) {
      return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <span className="font-medium">Hola, {session.user.name}</span>
          {session.user.role === "admin" && (
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition"
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              signOut();
              closeMenu();
            }}
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition"
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
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 hover:scale-105 transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            onClick={closeMenu}
            className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold border border-blue-500 shadow-sm hover:bg-blue-50 hover:shadow-md transition-all duration-300"
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
          <Image src="/images/logo.PNG" alt="PetAdopt Logo" width={55} height={55} />
          <span className="text-2xl font-bold">PetAdopt</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/pets">Mascotas</NavLink>
          <NavLink href="/about">Sobre Nosotros</NavLink>
          <AuthButtons />
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          className="md:hidden flex flex-col gap-1 focus:outline-none"
        >
          <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 px-4 py-3 flex flex-col gap-4 animate-fadeIn">
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/pets">Mascotas</NavLink>
          <NavLink href="/about">Sobre Nosotros</NavLink>
          <AuthButtons />
        </nav>
      )}
    </header>
  );
}

