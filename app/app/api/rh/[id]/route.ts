import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Expertise } from '@prisma/client';

// GET /api/rh/[id] - Récupérer un profil RH spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du profil requis' },
        { status: 400 }
      );
    }

    // Récupérer le profil RH
    const rhProfile = await prisma.rHProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            consultations: true,
            favorites: true
          }
        }
      }
    });

    if (!rhProfile) {
      return NextResponse.json(
        { error: 'Profil RH non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rhProfile
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du profil RH:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du profil RH'
      },
      { status: 500 }
    );
  }
}

// PUT /api/rh/[id] - Mettre à jour un profil RH
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { bio, expertise, priceRange, calendlyLink, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du profil requis' },
        { status: 400 }
      );
    }

    // Vérifier si le profil existe
    const existingProfile = await prisma.rHProfile.findUnique({
      where: { id }
    });

    if (!existingProfile) {
      return NextResponse.json(
        { error: 'Profil RH non trouvé' },
        { status: 404 }
      );
    }

    // Validation des expertises si présentes
    if (expertise && Array.isArray(expertise)) {
      const validExpertises = expertise.filter(e =>
        Object.values(Expertise).includes(e as Expertise)
      );

      if (validExpertises.length !== expertise.length) {
        return NextResponse.json(
          { error: 'Certaines expertises ne sont pas valides' },
          { status: 400 }
        );
      }
    }

    // Construire les données à mettre à jour
    const updateData: any = {};

    if (bio !== undefined) updateData.bio = bio;
    if (expertise !== undefined) updateData.expertise = expertise;
    if (priceRange !== undefined) updateData.priceRange = priceRange;
    if (calendlyLink !== undefined) updateData.calendlyLink = calendlyLink;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Mettre à jour le profil RH
    const updatedProfile = await prisma.rHProfile.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Profil RH mis à jour avec succès',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil RH:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du profil RH'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/rh/[id] - Supprimer un profil RH (optionnel)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du profil requis' },
        { status: 400 }
      );
    }

    // Vérifier si le profil existe
    const existingProfile = await prisma.rHProfile.findUnique({
      where: { id }
    });

    if (!existingProfile) {
      return NextResponse.json(
        { error: 'Profil RH non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le profil RH (cascade supprime consultations et favoris)
    await prisma.rHProfile.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Profil RH supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du profil RH:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du profil RH'
      },
      { status: 500 }
    );
  }
}
