import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // user password verification
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  pages: {
    signIn: "auth/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.id = token.sub;
      }

      return session;
    },
  },
});
