"use client";

import { useState } from "react";

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
        alert("Solicitud enviada con éxito 🚀");
        setIsOpen(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.error || "Error al enviar la solicitud ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Adoptar
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
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

              <div className="flex justify-end gap-3">
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
