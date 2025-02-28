import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservationId = params.id;
    
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
    
    // Get the specific reservation
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
    
    // Check if the reservation exists and belongs to the user
    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    
    if (reservation.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Format the reservation for the client
    const formattedReservation = {
      id: reservation.id,
      date: reservation.dateService,
      heure: reservation.heureService,
      statut: reservation.statut,
      montantTotal: reservation.montantTotal,
      adresse: reservation.adresse,
      codePostal: reservation.codePostal,
      ville: reservation.ville,
      commentaire: reservation.commentaire,
      services: reservation.items.map(item => ({
        id: item.service.id,
        nom: item.service.nom,
        prix: item.prix,
        description: item.service.description,
      })),
    };
    
    return NextResponse.json(formattedReservation);
  } catch (error) {
    console.error('Error fetching reservation details:', error);
    return NextResponse.json({ error: 'Error fetching reservation details' }, { status: 500 });
  }
}
