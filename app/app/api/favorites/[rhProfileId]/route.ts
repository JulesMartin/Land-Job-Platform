import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

// DELETE /api/favorites/[rhProfileId] - Retirer un profil RH des favoris
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ rhProfileId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
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

    if (!favorite) {
      return NextResponse.json(
        { error: 'Favori non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le favori
    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Retiré des favoris',
    });
  } catch (error) {
    console.error('Erreur lors du retrait des favoris:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors du retrait des favoris',
      },
      { status: 500 }
    );
  }
}
