import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-6">
        
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
            ¡Adopta una mascota hoy!
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Encuentra a tu compañero ideal y dale un hogar lleno de amor. 
            Tenemos perros, gatos y más esperando por ti.
          </p>
          <Link href="/pets">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
              Ver Mascotas
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/hero-pet.jpg"
            alt="Mascota feliz"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
