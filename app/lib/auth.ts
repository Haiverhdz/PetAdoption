import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../lib/mongodb";
import User from "../models/Users.model";
import bcrypt from "bcrypt";

interface TokenType {
  id?: string;
  name?: string;
  role?: "user" | "admin";
}
import { JWT } from "next-auth/jwt";

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
          role: user.role as "user" | "admin",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      await connectDB();

      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase();
        let existing = await User.findOne({
        token.role = existing.role as "user" | "admin";
      }

      if (user?.id) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role as "user" | "admin";
        token.role = user.role;
      }

      return token as TokenType;
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.name = token.name!;
        session.user.role = token.role === "admin" ? "admin" : "user";
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },