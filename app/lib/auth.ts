// app/lib/auth.ts
import { headers, cookies } from "next/headers";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = credentials?.email
          ? { id: "1", name: "Haiver", email: credentials.email }
          : null;
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

export interface Mascota {
  id: string;
  nombre: string;
  tipo: string;
  status?: string;
}

export async function fetchMisMascotas(accessToken?: string) {
  const host = headers().get("host")!;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/mis-mascotas`;

  const cookieStore = cookies();

  const res = await fetch(url, {
    headers: {
      Cookie: accessToken
        ? `next-auth.session-token=${accessToken}`
        : cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return { ok: false, status: res.status, mascotas: [] as Mascota[] };
  }

  const mascotas: Mascota[] = await res.json();
  return { ok: true, status: res.status, mascotas };
}
