import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "./mongodb";       
import User from "../models/Users.model"; 

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role as "user" | "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
};

import { headers, cookies } from "next/headers";

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

export async function fetchMisMascotas(): Promise<FetchMascotasResult> {
  try {
    const h = headers();
    const host = h.get("host");
    if (!host) {
      return { ok: false, status: 500, mascotas: [] };
    }

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/mis-mascotas`;

    const cookieStore = cookies();
    const cookieHeader =
      typeof (cookieStore as any)?.toString === "function"
        ? (cookieStore as any).toString()
        : (cookieStore.getAll?.() ?? [])
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
