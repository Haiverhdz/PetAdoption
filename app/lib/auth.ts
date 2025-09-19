import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import User from "../models/Users.model";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export interface TokenType extends JWT {
  id?: string;
  name?: string;
  role?: "user" | "admin";
}

export interface Mascota {
  id: string;
  nombre: string;
  tipo: string;
  status?: string;
}

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

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        });
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

  session: { strategy: "jwt" },

  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user, account, profile }): Promise<JWT> {
      await connectDB();

      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase();
        const existing = await User.findOne({ email });

        if (existing) {
          token.id = existing._id.toString();
          token.name = existing.name;
          token.role = existing.role as "user" | "admin";
        }
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role as "user" | "admin";
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