import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { verifyPassword } from './auth';
import { isAccountLocked, incrementLoginAttempts, resetLoginAttempts } from './accountLock';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Utiliser JWT pour les sessions (pas de table Session en DB)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Pages personnalisées
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },

  // Providers d'authentification
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        // Vérifier si le compte est verrouillé
        const locked = await isAccountLocked(credentials.email);
        if (locked) {
          throw new Error('Compte verrouillé. Veuillez réessayer dans 30 minutes.');
        }

        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          await incrementLoginAttempts(credentials.email);
          throw new Error('Email ou mot de passe incorrect');
        }

        // Vérifier le mot de passe
        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          await incrementLoginAttempts(credentials.email);
          throw new Error('Email ou mot de passe incorrect');
        }

        // Réinitialiser les tentatives de connexion
        await resetLoginAttempts(credentials.email);

        // Retourner l'utilisateur (sans le password)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      // Lors de la première connexion, ajouter les infos user au token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      // Ajouter les infos du token à la session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  // Debug en développement
  debug: process.env.NODE_ENV === 'development',
};
