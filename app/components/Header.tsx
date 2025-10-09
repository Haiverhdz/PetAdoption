"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      onClick={closeMenu}
      className={`transition px-3 py-1 rounded-lg ${
        pathname === href
          ? "text-yellow-300 font-semibold"
          : "hover:text-blue-200"
      }`}
    >
      {children}
    </Link>
  );

  const AuthButtons = () => {
    if (status === "loading") return <span>Cargando...</span>;

    if (session?.user) {
      const role = (session.user.role as "user" | "admin") ?? "user";

      return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <NavLink href="/perfil">Perfil</NavLink>
          {role === "admin" && <NavLink href="/dashboard">Dashboard</NavLink>}
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 
    w-[95%] md:w-[1120px] h-[70px] 
    rounded-2xl bg-white/20 backdrop-blur-md shadow-lg 
    text-blue-700 transition-all duration-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.PNG"
            alt="PetAdopt Logo"
            width={45}
            height={45}
          />
          <span className="text-2xl font-bold">PetAdopt</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* 👇 Aquí controlas el “Hola” de primero */}
          {status === "loading" ? (
            <span className="font-medium">Cargando...</span>
          ) : session?.user ? (
            <span className="font-medium">Hola, {session.user.name}</span>
          ) : (
            <span className="font-medium">Hola invitado</span>
          )}

          {/* Tus enlaces */}
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/pets">Mascotas</NavLink>
          <NavLink href="/about">Sobre Nosotros</NavLink>
          <AuthButtons />
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          className="md:hidden flex flex-col gap-1 focus:outline-none"
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[radial-gradient(circle_at_top_left,_#9fc7d3,_#5c7760,_#f5e9b5)] rounded-lg px-4 py-3 flex flex-col gap-4 animate-fadeIn">
          {status === "loading" ? (
            <span className="font-medium">Cargando...</span>
          ) : session?.user ? (
            <span className="font-medium">Hola, {session.user.name}</span>
          ) : (
            <span className="font-medium">Hola invitado</span>
          )}

          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/pets">Mascotas</NavLink>
          <NavLink href="/about">Sobre Nosotros</NavLink>
          <AuthButtons />
        </nav>
      )}
    </header>
  );
}
