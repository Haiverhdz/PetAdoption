// app/mis-mascotas/page.tsx
import { headers, cookies } from "next/headers";

export default async function MisMascotasPage() {
  // obtenemos host/protocolo
  const host = headers().get("host")!;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  // pasamos las cookies actuales al fetch para que next-auth las lea
  const cookieStore = cookies();

  const res = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(), // esto pasa la cookie de next-auth al API
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Mis Mascotas</h1>
        <p className="text-red-500">
          No autorizado o error ({res.status})
        </p>
      </div>
    );
  }

  const adopciones = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Mascotas</h1>
      <ul className="space-y-3">
        {adopciones.map((adop: any) => (
          <li key={adop._id} className="border rounded p-3">
            <p className="font-semibold">{adop.name}</p>
            <p className="text-sm text-gray-600">{adop.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
