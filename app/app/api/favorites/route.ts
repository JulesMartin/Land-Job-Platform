import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

// POST /api/favorites - Ajouter un profil RH aux favoris
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rhProfileId } = body;

    if (!rhProfileId) {
      return NextResponse.json(
        { error: 'ID du profil RH requis' },
        { status: 400 }
      );
    }

    // Vérifier que le profil RH existe
    const rhProfile = await prisma.rHProfile.findUnique({
      where: { id: rhProfileId },
    });

    if (!rhProfile) {
      return NextResponse.json(
        { error: 'Profil RH non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si déjà en favoris
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_rhProfileId: {
          userId: session.user.id,
          rhProfileId: rhProfileId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Déjà dans les favoris' },
        { status: 400 }
      );
    }

    // Ajouter aux favoris
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        rhProfileId: rhProfileId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Ajouté aux favoris',
      data: favorite,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'ajout aux favoris',
      },
      { status: 500 }
    );
  }
}

// GET /api/favorites - Récupérer les favoris de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer les favoris de l'utilisateur
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des favoris',
      },
      { status: 500 }
    );
  }
}
