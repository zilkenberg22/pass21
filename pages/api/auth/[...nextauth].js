import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/dbConnect";
import Users from "@/models/UserModel";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  // secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
  },
});