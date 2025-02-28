import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userEmail = session.user.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get the user's reservations
    const reservations = await prisma.devis.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        services: {
          select: {
            service: {
              select: {
                nom: true,
              },
            },
          },
        },
      },
    });
    
    // Format the reservations for the client
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      date: reservation.date,
      heure: reservation.heure,
      statut: reservation.statut,
      montantTotal: reservation.montantTotal,
      services: reservation.services.map(s => ({
        nom: s.service.nom,
      })),
    }));
    
    return NextResponse.json(formattedReservations);
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return NextResponse.json({ error: 'Error fetching reservations' }, { status: 500 });
  }
}
