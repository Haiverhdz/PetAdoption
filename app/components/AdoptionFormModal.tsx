"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface Props {
  petId: string;
  petName: string;
  petImage: string;
}

export default function AdoptionFormModal({ petId, petName, petImage }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, petId, petName, petImage }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          title: "¡Solicitud enviada! 🐾",
          text: `Tu solicitud para adoptar a ${petName} fue enviada con éxito.`,
          imageUrl: petImage,
          imageWidth: 120,
          imageHeight: 120,
          imageAlt: petName,
          icon: "success",
          confirmButtonColor: "#2563eb",
          background: "#f9fafb",
        });
        setIsOpen(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        Swal.fire({
          title: "Error ❌",
          text: data.error || "Hubo un problema al enviar la solicitud.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          background: "#fef2f2",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error de conexión ⚠️",
        text: "No se pudo conectar con el servidor.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 🔹 Botón dentro de la card */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg 
          bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 
          hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Adoptar
        </button>

        <button
          onClick={() => router.push("/pets")}
          className="mt-4 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 
          hover:bg-gray-300 transition-all duration-300"
        >
          ← Volver a mascotas
        </button>
      </div>

      {/* 🔹 Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Solicitud de adopción
            </h2>
            <p className="text-gray-600 mb-4">
              Estás aplicando para adoptar a <strong>{petName}</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Cuéntanos por qué quieres adoptar"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={4}
                required
              />

              <div className="flex justify-between items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => router.push("/pets")}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  ← Volver a mascotas
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
