import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
import prisma from '@/lib/prisma';

/**
 * GET /api/dashboard/rh/stats
 * Récupère les statistiques du profil RH de l'utilisateur connecté
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

    // Récupérer l'utilisateur avec son profil RH
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        rhProfile: {
          include: {
            consultations: {
              orderBy: { timestamp: 'desc' },
              take: 10, // Les 10 dernières consultations
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
            favorites: {
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
            _count: {
              select: {
                consultations: true,
                favorites: true,
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

    // Vérifier si l'utilisateur a un profil RH
    if (!user.rhProfile) {
      return NextResponse.json(
        { error: 'Aucun profil RH trouvé pour cet utilisateur' },
        { status: 404 }
      );
    }

    // Retourner les statistiques
    return NextResponse.json({
      profile: {
        id: user.rhProfile.id,
        bio: user.rhProfile.bio,
        expertise: user.rhProfile.expertise,
        priceRange: user.rhProfile.priceRange,
        calendlyLink: user.rhProfile.calendlyLink,
        isActive: user.rhProfile.isActive,
        createdAt: user.rhProfile.createdAt,
        updatedAt: user.rhProfile.updatedAt,
      },
      stats: {
        totalConsultations: user.rhProfile._count.consultations,
        totalFavorites: user.rhProfile._count.favorites,
      },
      recentConsultations: user.rhProfile.consultations,
      favoritedBy: user.rhProfile.favorites,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats RH:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
