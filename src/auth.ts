import { PrismaClient } from './app/generated/prisma';

import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from 'next';
import NextAuth from 'next-auth/providers/github';

const prisma = new PrismaClient();
export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.id as string;
      }
      return session;
    },
  },
});
