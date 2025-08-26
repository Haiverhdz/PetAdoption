"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Adoption {
  _id: string;
  name: string;
  email: string;
  message: string;
  petId: string;
  petImage: string;
  createdAt: string;
  status: "pendiente" | "aprobada" | "rechazada";
}

export default function DashboardPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todas" | "pendiente" | "aprobada" | "rechazada">("todas");
  const [search, setSearch] = useState("");

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [petVaccines, setPetVaccines] = useState("");
  const [petImage, setPetImage] = useState<File | null>(null);
  const [addingPet, setAddingPet] = useState(false);

  const user = { role: "admin" };

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const res = await fetch("/api/send-email", { cache: "no-store" });
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setAdoptions(data);
        } catch {
          console.error("Error: respuesta no es JSON", text);
        }
      } catch (error) {
        console.error("Error cargando solicitudes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

  const updateStatus = async (id: string, status: "aprobada" | "rechazada") => {
    try {
      const res = await fetch("/api/send-email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const updated = await res.json();
      if (res.ok) {
        setAdoptions((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      } else {
        alert(updated.error || "Error actualizando estado");
      }
    } catch (error) {
      console.error("Error actualizando estado", error);
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petImage) return alert("Selecciona una imagen para la mascota");

    try {
      const base64Image = await toBase64(petImage);

      setAddingPet(true);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: petName,
          breed: petBreed,
          age: petAge,
          description: petDescription,
          vaccines: petVaccines,
          petImage: base64Image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Mascota agregada correctamente!");
        setPetName("");
        setPetBreed("");
        setPetAge("");
        setPetDescription("");
        setPetVaccines("");
        setPetImage(null);
        setAdoptions([data.adoption, ...adoptions]); 
      } else {
        alert(data.error || "Error agregando mascota");
      }
    } catch (error: any) {
      console.error("Error agregando mascota:", error);
      alert(error.message || "Error agregando mascota");
    } finally {
      setAddingPet(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando solicitudes...</p>;
  if (adoptions.length === 0) return <p className="text-center mt-10">No hay solicitudes aún.</p>;

  const filteredAdoptions = adoptions
    .filter((a) => (filter === "todas" ? true : a.status === filter))
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.petId.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-2 flex-wrap">
        {["todas", "pendiente", "aprobada", "rechazada"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${filter === f ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setFilter(f as any)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, email o ID de mascota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {user?.role === "admin" && (
        <div className="mb-6 text-center">
          <Link href="/pets">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Ir a Pets
            </button>
          </Link>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 p-3 lg:grid-cols-3">
        {filteredAdoptions.map((adoption) => (
          <div key={adoption._id} className="border rounded-lg p-4 shadow-md relative">
            <span
              className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-bold ${
                adoption.status === "pendiente"
                  ? "bg-yellow-500"
                  : adoption.status === "aprobada"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {adoption.status}
            </span>
            <img src={adoption.petImage} alt={`Mascota ${adoption.petId}`} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 font-bold text-lg">{adoption.name}</h2>
            <p><b>Email:</b> {adoption.email}</p>
            <p><b>Mensaje:</b> {adoption.message}</p>
            <p><b>ID Mascota:</b> {adoption.petId}</p>
            <p className="text-sm text-gray-500">Fecha: {new Date(adoption.createdAt).toLocaleString()}</p>

            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => updateStatus(adoption._id, "aprobada")}>
                Aprobar
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => updateStatus(adoption._id, "rechazada")}>
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
            {user?.role === "admin" && (
        <form onSubmit={handleAddPet} className="mb-6 p-4 pt-4 bg-white rounded shadow space-y-3 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2">Agregar nueva mascota</h2>
          <input type="text" placeholder="Nombre" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="Raza" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="Edad" value={petAge} onChange={(e) => setPetAge(e.target.value)} className="w-full border rounded px-3 py-2" />
          <textarea placeholder="Descripción" value={petDescription} onChange={(e) => setPetDescription(e.target.value)} className="w-full border rounded px-3 py-2"></textarea>
          <input type="text" placeholder="Vacunas (separadas por coma)" value={petVaccines} onChange={(e) => setPetVaccines(e.target.value)} className="w-full border rounded px-3 py-2" />
          <input type="file" onChange={(e) => setPetImage(e.target.files?.[0] || null)} className="w-full" />
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            {addingPet ? "Agregando..." : "Agregar mascota"}
          </button>
        </form>
      )}
    </div>
  );
}
