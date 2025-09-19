import { fetchMisMascotas } from "../lib/auth";

export default async function MisMascotasPage() {
  const { ok, status, adopciones } = await fetchMisMascotas();

  if (!ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Mis Mascotas</h1>
        <p className="text-red-500">No autorizado o error ({status})</p>
      </div>
    );
  }

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
