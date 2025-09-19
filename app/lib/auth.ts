import { headers, cookies } from "next/headers";

export async function fetchMisMascotas() {
  const host = headers().get("host")!;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  const cookieStore = cookies();

  const res = await fetch(url, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (!res.ok) {
    return { ok: false, status: res.status, adopciones: [] };
  }

  const adopciones = await res.json();
  return { ok: true, status: res.status, adopciones };
}
