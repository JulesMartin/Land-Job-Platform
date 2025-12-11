import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

// POST /api/consultations - Logger une consultation
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

    // Créer le log de consultation
    const consultationLog = await prisma.consultationLog.create({
      data: {
        userId: session.user.id,
        rhProfileId: rhProfileId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation enregistrée',
      data: consultationLog,
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la consultation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'enregistrement de la consultation',
      },
      { status: 500 }
    );
  }
}

// GET /api/consultations - Récupérer l'historique des consultations de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer les consultations de l'utilisateur
    const consultations = await prisma.consultationLog.findMany({
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
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des consultations',
      },
      { status: 500 }
    );
  }
}
