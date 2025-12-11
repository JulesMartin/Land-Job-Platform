import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
import prisma from '@/lib/prisma';

/**
 * GET /api/dashboard/user/consultations
 * Récupère l'historique des consultations et les favoris de l'utilisateur connecté
 * Auth: Requise
 */
export async function GET(req: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur avec ses consultations et favoris
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        consultations: {
          orderBy: { timestamp: 'desc' },
          include: {
            rhProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        favorites: {
          orderBy: { createdAt: 'desc' },
          include: {
            rhProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
                _count: {
                  select: {
                    consultations: true,
                    favorites: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    // Retourner les données
    return NextResponse.json({
      consultations: user.consultations,
      favorites: user.favorites,
      stats: {
        totalConsultations: user.consultations.length,
        totalFavorites: user.favorites.length,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
