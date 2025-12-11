import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Expertise } from '@prisma/client';

// GET /api/rh - Listing des profils RH avec filtres
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Récupérer les paramètres de filtre
    const expertiseParam = searchParams.get('expertise');
    const priceRangeParam = searchParams.get('priceRange');
    const searchParam = searchParams.get('search');
    const isActiveParam = searchParams.get('isActive');

    // Construction des filtres Prisma
    const where: any = {};

    // Filtre par statut actif (par défaut, seulement les profils actifs)
    if (isActiveParam === 'false') {
      where.isActive = false;
    } else if (isActiveParam === 'all') {
      // Pas de filtre d'état pour permettre l'affichage de tous les profils (admin)
    } else {
      // Par défaut ou si isActive=true, on retourne uniquement les profils actifs
      where.isActive = true;
    }

    // Filtre par expertise
    if (expertiseParam) {
      const expertises = expertiseParam.split(',').filter(e =>
        Object.values(Expertise).includes(e as Expertise)
      ) as Expertise[];

      if (expertises.length > 0) {
        where.expertise = {
          hasSome: expertises
        };
      }
    }

    // Filtre par prix
    if (priceRangeParam) {
      where.priceRange = priceRangeParam;
    }

    // Filtre par recherche (nom de l'utilisateur)
    if (searchParam) {
      where.user = {
        name: {
          contains: searchParam,
          mode: 'insensitive'
        }
      };
    }

    // Récupérer les profils RH
    const rhProfiles = await prisma.rHProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        _count: {
          select: {
            consultations: true,
            favorites: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      count: rhProfiles.length,
      data: rhProfiles
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des profils RH:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des profils RH'
      },
      { status: 500 }
    );
  }
}

// POST /api/rh - Créer un profil RH
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, bio, expertise, priceRange, calendlyLink } = body;

    // Validation des champs requis
    if (!userId) {
      return NextResponse.json(
        { error: 'userId requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà un profil RH
    const existingProfile = await prisma.rHProfile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Un profil RH existe déjà pour cet utilisateur' },
        { status: 409 }
      );
    }

    // Validation des expertises
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

    // Créer le profil RH
    const rhProfile = await prisma.rHProfile.create({
      data: {
        userId,
        bio: bio || null,
        expertise: expertise || [],
        priceRange: priceRange || null,
        calendlyLink: calendlyLink || null,
        isActive: false // Par défaut, le profil doit être activé par un admin
      },
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

    return NextResponse.json(
      {
        success: true,
        message: 'Profil RH créé avec succès. En attente d\'activation par un administrateur.',
        data: rhProfile
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur lors de la création du profil RH:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création du profil RH'
      },
      { status: 500 }
    );
  }
}
