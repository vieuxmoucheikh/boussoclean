import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    // Query parameters for filtering
    const where = category ? { categorie: category } : {};
    
    const services = await prisma.service.findMany({
      where,
      orderBy: {
        nom: 'asc',
      },
    });
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you would check if the user is an admin here
    
    const data = await request.json();
    const { nom, description, prix, unite, image } = data;
    
    // Validation
    if (!nom || !description || !prix) {
      return NextResponse.json({ error: 'Nom, description et prix sont obligatoires' }, { status: 400 });
    }
    
    const service = await prisma.service.create({
      data: {
        nom,
        description,
        prix: parseFloat(prix),
        unite,
        image,
      },
    });
    
    return NextResponse.json({ 
      message: 'Service créé avec succès',
      service 
    });
    
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du service' }, { status: 500 });
  }
}
