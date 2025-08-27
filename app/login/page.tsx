"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login con credenciales
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      // Fuerza recarga de la página para que useSession() tenga los datos
      router.replace("/");
    }

    setLoading(false);
  };

  // Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    // redirige al callbackUrl y recarga la sesión automáticamente
    const res = await signIn("google", { redirect: false });

    if (res?.error) {
      setError("No se pudo iniciar sesión con Google");
    } else {
      router.replace("/"); // recarga la página para actualizar session
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Iniciar sesión
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          {loading ? "Redirigiendo..." : "Iniciar sesión con Google"}
        </button>
      </div>
    </div>
  );
}
