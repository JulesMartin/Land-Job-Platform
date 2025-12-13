import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/nextAuth';
import prisma from '@/lib/prisma';

// PUT /api/packages/[id] - Mettre à jour un package
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { name, title, price, description, deliveryTime, features, order, isActive } = body;

    // Vérifier que le package existe et appartient à l'utilisateur
    const existingPackage = await prisma.package.findUnique({
      where: { id },
      include: {
        rhProfile: {
          include: { user: true }
        }
      }
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Package non trouvé' },
        { status: 404 }
      );
    }

    if (existingPackage.rhProfile.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Non autorisé à modifier ce package' },
        { status: 403 }
      );
    }

    // Construire les données à mettre à jour
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (deliveryTime !== undefined) updateData.deliveryTime = deliveryTime;
    if (features !== undefined) updateData.features = features;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Mettre à jour le package
    const updatedPackage = await prisma.package.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: 'Package mis à jour avec succès',
      data: updatedPackage
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du package:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du package'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/packages/[id] - Supprimer un package
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Vérifier que le package existe et appartient à l'utilisateur
    const existingPackage = await prisma.package.findUnique({
      where: { id },
      include: {
        rhProfile: {
          include: { user: true }
        }
      }
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Package non trouvé' },
        { status: 404 }
      );
    }

    if (existingPackage.rhProfile.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Non autorisé à supprimer ce package' },
        { status: 403 }
      );
    }

    // Supprimer le package
    await prisma.package.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Package supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du package:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du package'
      },
      { status: 500 }
    );
  }
}
