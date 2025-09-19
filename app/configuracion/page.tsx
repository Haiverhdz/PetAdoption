
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth"; 
import { redirect } from "next/navigation";

export default async function ConfiguracionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Configuración de la cuenta
      </h1>

      <section className="space-y-4">
        <p className="text-gray-700">
          Hola, <b>{session.user?.name ?? "Usuario"}</b>. Aquí puedes modificar
          la información de tu cuenta.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              defaultValue={session.user?.name ?? ""}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Correo</label>
            <input
              type="email"
              defaultValue={session.user?.email ?? ""}
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </main>
  );
}
