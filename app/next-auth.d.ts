import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      image?: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "user" | "admin";
  }
}
