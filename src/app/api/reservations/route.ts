import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const data = await request.json();
    const { 
      nom, 
      prenom, 
      email, 
      telephone, 
      adresse, 
      codePostal, 
      ville, 
      date, 
      heure, 
      message, 
      selectedServices 
    } = data;
    
    // Validate required fields
    if (!nom || !prenom || !email || !telephone || !adresse || !codePostal || !ville || !date || !heure || !selectedServices || selectedServices.length === 0) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Get authenticated user if available
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    // For now, store as a Devis (quote) rather than a Reservation
    // Since Reservation requires authentication
    const devis = await prisma.devis.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        adresse,
        codePostal,
        ville,
        datePreferee: new Date(date),
        message,
        statut: 'en_attente',
        userId: userId || null,
      },
    });
    
    // Get service details from database
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: selectedServices,
        },
      },
    });
    
    // Calculate total amount
    let montantTotal = 0;
    
    // Create devis items for each selected service
    const devisItems = [];
    for (const serviceId of selectedServices) {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        // We're using a default quantity of 1 for now
        // In a real implementation, you'd capture quantities per service
        const quantite = 1;
        const prix = service.prix * quantite;
        montantTotal += prix;
        
        await prisma.devisItem.create({
          data: {
            devisId: devis.id,
            serviceId: service.id,
            quantite,
            prix,
          },
        });
      }
    }
    
    // Update the total amount
    await prisma.devis.update({
      where: { id: devis.id },
      data: { montantTotal },
    });
    
    // In a real implementation, you would send confirmation emails here
    
    return NextResponse.json({ 
      success: true, 
      message: 'Demande de réservation créée avec succès',
      devisId: devis.id 
    });
    
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création de votre réservation' }, { status: 500 });
  }
}

// Get all reservations (admin only in a real implementation)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // In a real implementation, check if user is admin
    // For now, just return a limited set of devis
    const devis = await prisma.devis.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });
    
    return NextResponse.json(devis);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des réservations' }, { status: 500 });
  }
}
