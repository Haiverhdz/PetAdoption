import { cookies, headers } from "next/headers";

export default async function MisMascotasPage() {
  const host = headers().get("host")!;
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  const res = await fetch(url, {
    headers: {
      cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Mis Mascotas</h1>
        <p>No autorizado o error ({res.status})</p>
      </main>
    );
  }

  const mascotas = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Mascotas</h1>
      {mascotas.length === 0 ? (
        <p>No tienes mascotas adoptadas todavía.</p>
      ) : (
        <ul className="space-y-4">
          {mascotas.map((m: any) => (
            <li
              key={m._id}
              className="p-4 border rounded-lg shadow-sm flex items-center gap-4"
            >
              <img
                src={m.petImage}
                alt={m.petName}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-xl">{m.petName}</h2>
                <p className="text-gray-600">{m.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
