import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-6">
          Sobre Nosotros
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
          En <span className="font-semibold">AdoptaPet</span> creemos que cada
          mascota merece un hogar lleno de amor. Nuestra labor es conectar a
          animales en situación de abandono con familias responsables.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <Image
            src="/images/equipo.jpg"
            alt="Nuestro equipo"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Somos un grupo de voluntarios y profesionales comprometidos con
              el bienestar animal. Rescatamos, cuidamos y buscamos hogares para
              perros, gatos y otras especies que lo necesitan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Trabajamos de la mano con veterinarios, hogares de paso y
              adoptantes para asegurar que cada proceso sea responsable y
              seguro.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Nuestros valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Compasión
            </h3>
            <p className="text-gray-600">
              Tratamos a cada animal con respeto y cariño, brindándole el
              cuidado que merece.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Responsabilidad
            </h3>
            <p className="text-gray-600">
              Promovemos adopciones responsables y acompañamos a las familias
              durante el proceso.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Transparencia
            </h3>
            <p className="text-gray-600">
              Gestionamos nuestros recursos y procesos de forma abierta para
              generar confianza.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ¿Quieres ayudar?
          </h3>
          <p className="text-gray-600 mb-6">
            Puedes adoptar, ser voluntario o realizar donaciones para seguir
            cambiando vidas.
          </p>
          <a
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
