import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

// GET /api/favorites/check/[rhProfileId] - Vérifier si un profil RH est en favoris
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ rhProfileId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { isFavorite: false },
        { status: 200 }
      );
    }

    const { rhProfileId } = await params;

    if (!rhProfileId) {
      return NextResponse.json(
        { error: 'ID du profil RH requis' },
        { status: 400 }
      );
    }

    // Vérifier si le favori existe
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_rhProfileId: {
          userId: session.user.id,
          rhProfileId: rhProfileId,
        },
      },
    });

    return NextResponse.json({
      isFavorite: !!favorite,
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du favori:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la vérification du favori',
      },
      { status: 500 }
    );
  }
}
