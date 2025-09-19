import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="max-w-xl mx-auto text-center mt-20">
        <h1 className="text-2xl font-bold mb-4">No has iniciado sesión</h1>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
        <Image
          src={session.user.image ?? "/images/default-avatar.png"}
          alt="Foto de perfil"
          width={120}
          height={120}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold">
          Hola, {session.user.name ?? "Usuario"}
        </h1>
        <p className="text-gray-600">{session.user.email}</p>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          Rol: {(session.user.role as string) ?? "user"}
        </span>

        <div className="mt-6 flex gap-4">
          <Link
            href="/mis-mascotas"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Mis mascotas
          </Link>
          <Link
            href="/configuracion"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Configuración
          </Link>
        </div>
      </div>
    </main>
  );
}
