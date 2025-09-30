import { headers, cookies } from "next/headers";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../models/Users.model";

type Role = "user" | "admin";

export interface Mascota {
  id: string;
  nombre: string;
  tipo: string;
  status?: string;
}

export type FetchMascotasResult = {
  ok: boolean;
  status: number;
  mascotas: Mascota[];
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase();
        const existing = await User.findOne({ email });
        if (existing) {
          token.id = existing._id.toString();
          token.name = existing.name;
          token.email = existing.email;
          token.role = existing.role;
        }
      }

      if (user?.id) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as Role, 
        };
      }
      return session;
    },
  },
};

export async function fetchMisMascotas(): Promise<FetchMascotasResult> {
  try {
    const h = await headers();
    const host = h.get("host");
    if (!host) {
      return { ok: false, status: 500, mascotas: [] };
    }

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/mis-mascotas`;

    const cookieStore = cookies();
    const cookieHeader = (cookieStore.getAll?.() ?? [])
      .map((c: any) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(url, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, status: res.status, mascotas: [] };
    }

    const mascotas = (await res.json()) as Mascota[];
    return { ok: true, status: res.status, mascotas };
  } catch (err) {
    console.error("fetchMisMascotas error:", err);
    return { ok: false, status: 500, mascotas: [] };
  }
}
