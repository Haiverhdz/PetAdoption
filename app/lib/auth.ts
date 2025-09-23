import { headers, cookies } from "next/headers";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/Users.model"; 
import bcrypt from "bcryptjs";

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
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
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
          role: token.role as string,
        };
      }
      return session;
    },
  },
};
