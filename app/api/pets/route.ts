import { NextResponse } from "next/server";

const pets = [
  { id: 1, name: "Lucas", type: "Perro", age: "4 años", breed: "Pinsnauser", description: "Lucas es un perro muy amigable y juguetón.",
  vaccines: ["Rabia", "Parvovirus"],  image: "/images/pets/dog1.jpg" },
  { id: 2, name: "Mia", type: "Perro",  age: "5 años", breed: "Chihuahua", description: "Mia es una perra tierna y adorable.",
  vaccines: ["Rabia", "Parvovirus"], image: "/images/pets/dog3.jpg" },
  { id: 3, name: "Lulú", type: "Perro", age: "4 meses", breed: "Chihuhua", description: "Lulú es una bebé muy juiciosa y consentida.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/dog2.jpg" },
  { id: 4, name: "Sasha", type: "Perro", age: "4 años", breed: "Criolla", description: "Sacha es una perra muy amigable y juguetona.",
  vaccines: ["Rabia", "Parvovirus"],  image: "/images/pets/dog4.JPG" },
  { id: 5, name: "Brandon", type: "Perro",  age: "5 años", breed: "Pitbull", description: "Brando es un perro tierno y protector.",
  vaccines: ["Rabia", "Parvovirus"], image: "/images/pets/dog5.JPG" },
  { id: 6, name: "Aquiles", type: "Perro", age: "4 meses", breed: "Criollo", description: "Aquiles es un perro muy consentido, celoso y protector.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/dog6.JPG" },
  { id: 7, name: "Zeús", type: "Perro", age: "4 años", breed: "Criollo", description: "Zeus es un perro muy amigable y juguetón.",
  vaccines: ["Rabia", "Parvovirus"],  image: "/images/pets/dog7.JPG" },
  { id: 8, name: "Tony", type: "Perro",  age: "5 años", breed: "Schnauzer", description: "Tony es un perro tierna y le gusta el futbol.",
  vaccines: ["Rabia", "Parvovirus"], image: "/images/pets/dog8.JPG" },
  { id: 9, name: "Teddy", type: "Perro", age: "6 años", breed: "Chihuhua", description: "Teddy es un perro muy juicioso y consentido.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/dog9.JPG" },
  { id: 10, name: "Paquita", type: "Perro", age: "4 años", breed: "Criolla", description: "Paquita viene de la costa y es tierna.",
  vaccines: ["Rabia", "Parvovirus"],  image: "/images/pets/dog10.JPG" },
  { id: 11, name: "Alaska", type: "Perro",  age: "3 años", breed: "Criolla", description: "Alaska es una perra tierna y adorable.",
  vaccines: ["Rabia", "Parvovirus"], image: "/images/pets/dog11.JPG" },
  { id: 12, name: "Justin", type: "Gato", age: "8 años", breed: "felino", description: "Justin es un gato muy independiente.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/cat1.JPG" },
  { id: 13, name: "Eros", type: "Gato", age: "9 meses", breed: "felino", description: "Eros es un gato muy independiente y adorable.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/cat2.JPG" },
  { id: 14, name: "Jamaica", type: "Perro", age: "9 años", breed: "Criolla", description: "Jamaica es una perrita muy tierna y familiar.",
  vaccines: ["Rabia", "Parvovirus"],image: "/images/pets/dog12.JPG" },
  
];

export async function GET() {
  return NextResponse.json(pets);
}
