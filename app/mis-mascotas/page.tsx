import { fetchMisMascotas, Mascota } from "../lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function MisMascotasPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { ok, status, mascotas } = await fetchMisMascotas(session.accessToken);

  if (!ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Mis Mascotas</h1>
        <p className="text-red-500">No autorizado o error ({status})</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Mascotas</h1>
      <ul className="space-y-4">
        {mascotas.map((m: Mascota) => (
          <li
            key={m.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{m.nombre}</p>
              <p className="text-gray-600">{m.tipo}</p>
            </div>
            {m.status && (
              <span className="text-sm text-gray-500">{m.status}</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
