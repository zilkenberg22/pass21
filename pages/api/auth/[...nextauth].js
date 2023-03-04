import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/dbConnect";
import { decrypt } from "@/lib/tools";
import Users from "@/models/UserModel";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Өгөгдлийн сантай холбогдож чадахгүй байна!";
        });

        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("Э-мэйл хаяг бүртгэгдээгүй байна. Та бүртгүүлнэ үү");
        }

        var decryptedData = decrypt(result.password);

        const checkPassword = decryptedData === credentials.password;

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Э-мэйл хаяг эсвэл нууц үг буруу байна!");
        }

        return result;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60,
    // updateAge: 15 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
