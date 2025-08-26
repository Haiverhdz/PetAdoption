"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Pet {
  id: number;
  name: string;
  type: string;
  age: string;
  breed: string;
  description: string;
  vaccines: string[];
  image: string;
}

export default function MascotasPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("/api/pets");
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error cargando mascotas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const displayedPets = filteredPets.slice(
    (currentPage - 1) * petsPerPage,
    currentPage * petsPerPage
  );

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Mascotas disponibles para adopción
      </h1>

      {/* Buscador */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre o raza..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); 
          }}
          className="border rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid de mascotas */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-60 bg-gray-200" />
                <div className="p-4 text-center space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                  <div className="h-12 bg-gray-200 rounded mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                  <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mt-2" />
                </div>
              </div>
            ))
          : displayedPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={pet.image}
                  alt={pet.name}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-center space-y-2">
                  <h2 className="text-xl font-semibold">{pet.name}</h2>
                  <p className="text-gray-500">
                    {pet.breed} - {pet.age}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm bg-gray-50 p-2 rounded">
                    {pet.description}
                  </p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Vacunas: {pet.vaccines?.join(", ") || "No disponible"}
                  </p>
                  <Link href={`/pets/${pet.id}`}>
                    <button className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}
