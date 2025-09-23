import { headers, cookies } from "next/headers";

export interface Mascota {
  id: string;
  nombre: string;
  tipo: string;
  status?: string;
}

export async function fetchMisMascotas() {
  const h = headers();
  const host = h.get("host")!;
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  const cookieStore = cookies();

  const res = await fetch(url, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return { ok: false, status: res.status, mascotas: [] as Mascota[] };
  }

  const mascotas = (await res.json()) as Mascota[];
  return { ok: true, status: res.status, mascotas };
}
