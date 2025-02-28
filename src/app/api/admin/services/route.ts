import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

// Helper function to check if user is admin
async function isAdmin(email: string) {
  const adminSql = `
    SELECT * FROM "User" 
    WHERE email = $1 AND role = 'ADMIN'
  `;
  
  const adminResult = await query(adminSql, [email]);
  return adminResult.rows.length > 0;
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Check if user is admin
    const admin = await isAdmin(session.user.email);
    
    if (!admin) {
      return NextResponse.json({ error: 'Non autorisé - Accès administrateur requis' }, { status: 403 });
    }
    
    // Get form data from request
    const data = await request.json();
    const { nom, description, prix, unite, image, categorie } = data;
    
    // Validate required fields
    if (!nom || !description || !prix || !unite || !categorie) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Create the service
    const createServiceSql = `
      INSERT INTO "Service" (
        id, nom, description, prix, unite, image, categorie, "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const now = new Date();
    const serviceId = `service_${Date.now()}`;
    
    const createServiceResult = await query(createServiceSql, [
      serviceId,
      nom,
      description,
      prix,
      unite,
      image || null,
      categorie,
      now,
      now
    ]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Service créé avec succès',
      service: createServiceResult.rows[0]
    });
    
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création du service' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Check if user is admin
    const admin = await isAdmin(session.user.email);
    
    if (!admin) {
      return NextResponse.json({ error: 'Non autorisé - Accès administrateur requis' }, { status: 403 });
    }
    
    // Get all services with additional stats
    const servicesSql = `
      SELECT 
        s.*,
        COUNT(DISTINCT di."devisId") as devis_count,
        COUNT(DISTINCT a.id) as avis_count,
        COALESCE(AVG(a.note), 0) as note_moyenne
      FROM "Service" s
      LEFT JOIN "DevisItem" di ON s.id = di."serviceId"
      LEFT JOIN "Avis" a ON s.id = a."serviceId"
      GROUP BY s.id
      ORDER BY s."createdAt" DESC
    `;
    
    const servicesResult = await query(servicesSql);
    
    return NextResponse.json(servicesResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des services' }, { status: 500 });
  }
}
