"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import AdoptionFormModal from "../../components/AdoptionFormModal";

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

export default function PetDetailPage() {
  const { id } = useParams(); 
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/pets")
      .then((res) => res.json())
      .then((data: Pet[]) => {
        const foundPet = data.find((p) => p.id === Number(id));
        setPet(foundPet || null);
      });
  }, [id]);

  if (!pet) {
    return (
      <section className="max-w-4xl mx-auto py-12 px-6 text-center">
        <p className="text-gray-500">Cargando mascota...</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white/60 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={pet.image}
          alt={pet.name}
          width={600}
          height={400}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-700">{pet.name}</h1>
          <p className="text-gray-500 text-lg">
            {pet.breed} - {pet.age}
          </p>
          <p className="mt-4 text-gray-600">{pet.description}</p>
          <p className="mt-2 text-gray-500">
            <strong>Vacunas:</strong> {pet.vaccines.join(", ")}
          </p>
          <AdoptionFormModal petId={String(pet.id)} petName={pet.name} petImage={pet.image}/>
        </div>
      </div>
    </section>
  );
}
