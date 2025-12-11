import { getServerSession } from 'next-auth/next';
import { authOptions } from './nextAuth';

/**
 * Helper pour récupérer la session côté serveur
 * Utilise getServerSession de NextAuth avec nos options configurées
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Helper pour vérifier si l'utilisateur est authentifié
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Helper pour récupérer l'utilisateur actuel
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}
