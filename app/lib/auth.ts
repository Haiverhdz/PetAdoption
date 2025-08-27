import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../lib/mongodb";
import User from "../models/Users.model";
import bcrypt from "bcrypt";

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
          role: user.role,
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
    // JWT: guarda info de usuario
    async jwt({ token, user, account, profile }) {
      await connectDB();

      // Login con Google
      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase();
        let existing = await User.findOne({ $or: [{ email }, { googleId: account.providerAccountId }] });

        if (!existing) {
          existing = await User.create({
            name: profile.name || profile.given_name || "Usuario Google",
            email,
            googleId: account.providerAccountId,
            role: "user",
          });
        } else if (!existing.googleId) {
          existing.googleId = account.providerAccountId;
          await existing.save();
        }

        token.sub = existing._id.toString(); // clave para Google
        token.name = existing.name;
        token.role = existing.role;
        token.email = existing.email;
      }

      // Login con Credenciales
      if (user?.id) {
        token.sub = user.id;
        token.name = user.name;
        token.role = user.role;
        token.email = user.email;
      }

      return token;
    },

    // Sesión: lo que ve el frontend
    async session({ session, token }) {
      await connectDB();

      if (session.user) {
        // Busca usuario en DB por token.sub (Google) o email
        const user = await User.findOne({
          $or: [{ _id: token.sub }, { email: token.email }],
        });

        if (user) {
          session.user.id = user._id.toString();
          session.user.name = user.name;
          session.user.role = user.role;
        } else {
          // Fallback
          session.user.id = token.sub as string;
          session.user.name = token.name as string;
          session.user.role = token.role as string;
        }
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
