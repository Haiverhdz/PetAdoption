import User from "../models/Users.model";
import bcrypt from "bcrypt";

interface TokenType {
  id?: string;
  name?: string;
  role?: "user" | "admin";
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
    export const authOptions: NextAuthOptions = {

      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase();
        let existing = await User.findOne({ $or: [{ email }, { googleId: account.providerAccountId }] });
        let existing = await User.findOne({
          $or: [{ email }, { googleId: account.providerAccountId }],
        });

        if (!existing) {
          existing = await User.create({
            name: profile.name || "Usuario Google", 
            name: profile.name || "Usuario Google",
            email,
            googleId: account.providerAccountId,
            role: "user",
    export const authOptions: NextAuthOptions = {

        token.id = existing._id.toString();
        token.name = existing.name;
        token.role = existing.role;
        token.role = existing.role as "user" | "admin";
      }

      if (user?.id) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.role = user.role as "user" | "admin";
      }

      return token;
      return token as TokenType;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.id = token.id!;
        session.user.name = token.name!;
        session.user.role = token.role === "admin" ? "admin" : "user";
      }
      return session;
    };