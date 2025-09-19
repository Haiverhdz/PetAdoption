import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MisMascotasPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const h = await headers(); 
  const host = h.get("host")!;
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  const res = await fetch(url, {
    headers: {
      Cookie: `next-auth.session-token=${session?.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Mis Mascotas</h1>
        <p>No autorizado o error ({res.status})</p>
      </div>
    );
  }

  const mascotas = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Mascotas</h1>
      <ul className="space-y-4">
        {mascotas.map((m: any) => (
          <li
            key={m.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{m.nombre}</p>
              <p className="text-gray-600">{m.tipo}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}