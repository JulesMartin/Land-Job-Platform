import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// POST /api/packages - Créer un nouveau package
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rhProfileId, name, title, price, description, deliveryTime, features, order } = body;

    // Validation
    if (!rhProfileId || !name || !title || !price || !description || !deliveryTime || !features || order === undefined) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur est bien le propriétaire du profil RH
    const rhProfile = await prisma.rHProfile.findUnique({
      where: { id: rhProfileId },
      include: { user: true }
    });

    if (!rhProfile || rhProfile.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Non autorisé à créer un package pour ce profil' },
        { status: 403 }
      );
    }

    // Vérifier le nombre de packages actifs (maximum 4)
    const activePackagesCount = await prisma.package.count({
      where: {
        rhProfileId,
        isActive: true
      }
    });

    if (activePackagesCount >= 4) {
      return NextResponse.json(
        { error: 'Vous ne pouvez pas avoir plus de 4 packages actifs' },
        { status: 400 }
      );
    }

    // Créer le package
    const newPackage = await prisma.package.create({
      data: {
        rhProfileId,
        name,
        title,
        price,
        description,
        deliveryTime,
        features,
        order,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Package créé avec succès',
      data: newPackage
    });

  } catch (error) {
    console.error('Erreur lors de la création du package:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création du package'
      },
      { status: 500 }
    );
  }
}

// GET /api/packages?rhProfileId=xxx - Récupérer tous les packages d'un profil RH
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rhProfileId = searchParams.get('rhProfileId');

    if (!rhProfileId) {
      return NextResponse.json(
        { error: 'rhProfileId requis' },
        { status: 400 }
      );
    }

    const packages = await prisma.package.findMany({
      where: {
        rhProfileId,
        isActive: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: packages
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des packages:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des packages'
      },
      { status: 500 }
    );
  }
}
