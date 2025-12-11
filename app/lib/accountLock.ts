import prisma from './prisma';

const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10);
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes en millisecondes

/**
 * Vérifie si un compte est verrouillé
 * @param email - Email de l'utilisateur
 * @returns true si le compte est verrouillé, false sinon
 */
export async function isAccountLocked(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { lockedAt: true, invalid_login_attempts: true },
  });

  if (!user || !user.lockedAt) return false;

  // Vérifier si le temps de verrouillage est écoulé
  const lockExpired = Date.now() - user.lockedAt.getTime() > LOCK_TIME;

  if (lockExpired) {
    // Réinitialiser le verrouillage
    await prisma.user.update({
      where: { email },
      data: {
        lockedAt: null,
        invalid_login_attempts: 0,
      },
    });
    return false;
  }

  return true;
}

/**
 * Incrémente le compteur de tentatives de connexion échouées
 * @param email - Email de l'utilisateur
 */
export async function incrementLoginAttempts(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { invalid_login_attempts: true },
  });

  if (!user) return;

  const newAttempts = user.invalid_login_attempts + 1;

  await prisma.user.update({
    where: { email },
    data: {
      invalid_login_attempts: newAttempts,
      lockedAt: newAttempts >= MAX_LOGIN_ATTEMPTS ? new Date() : null,
    },
  });
}

/**
 * Réinitialise le compteur de tentatives de connexion
 * @param email - Email de l'utilisateur
 */
export async function resetLoginAttempts(email: string): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: {
      invalid_login_attempts: 0,
      lockedAt: null,
    },
  });
}

/**
 * Déverrouille manuellement un compte
 * @param email - Email de l'utilisateur
 */
export async function unlockAccount(email: string): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: {
      invalid_login_attempts: 0,
      lockedAt: null,
    },
  });
}
