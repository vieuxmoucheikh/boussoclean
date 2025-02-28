import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Get user ID from email
    const userSql = 'SELECT id FROM "User" WHERE email = $1';
    const userResult = await query(userSql, [session.user.email]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    const userId = userResult.rows[0].id;
    
    // Get form data from request
    const data = await request.json();
    const { note, commentaire, serviceId } = data;
    
    // Validate required fields
    if (!note || note < 1 || note > 5) {
      return NextResponse.json({ error: 'La note doit être comprise entre 1 et 5' }, { status: 400 });
    }
    
    if (!commentaire) {
      return NextResponse.json({ error: 'Le commentaire est obligatoire' }, { status: 400 });
    }
    
    // Check if service exists if serviceId is provided
    if (serviceId) {
      const serviceSql = 'SELECT id FROM "Service" WHERE id = $1';
      const serviceResult = await query(serviceSql, [serviceId]);
      
      if (serviceResult.rows.length === 0) {
        return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
      }
    }
    
    // Check if user has already submitted a review for this service
    if (serviceId) {
      const existingReviewSql = `
        SELECT id FROM "Avis" 
        WHERE "userId" = $1 AND "serviceId" = $2
      `;
      
      const existingReviewResult = await query(existingReviewSql, [userId, serviceId]);
      
      if (existingReviewResult.rows.length > 0) {
        return NextResponse.json({ error: 'Vous avez déjà laissé un avis pour ce service' }, { status: 400 });
      }
    }
    
    // Create the review
    const createReviewSql = `
      INSERT INTO "Avis" (
        id, note, commentaire, "userId", "serviceId", "createdAt", "updatedAt", "publie"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const now = new Date();
    const reviewId = `avis_${Date.now()}`;
    
    const createReviewResult = await query(createReviewSql, [
      reviewId,
      note,
      commentaire,
      userId,
      serviceId || null,
      now,
      now,
      false // Not published until approved by admin
    ]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Avis créé avec succès, il sera publié après modération',
      avis: createReviewResult.rows[0]
    });
    
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création de l\'avis' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    const publie = searchParams.get('publie') === 'true';
    
    let avisSql = `
      SELECT 
        a.*,
        u.name as "userName",
        s.nom as "serviceName"
      FROM "Avis" a
      LEFT JOIN "User" u ON a."userId" = u.id
      LEFT JOIN "Service" s ON a."serviceId" = s.id
      WHERE a.publie = $1
    `;
    
    const params = [publie];
    
    if (serviceId) {
      avisSql += ` AND a."serviceId" = $2`;
      params.push(serviceId);
    }
    
    avisSql += ` ORDER BY a."createdAt" DESC`;
    
    const avisResult = await query(avisSql, params);
    
    return NextResponse.json(avisResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des avis' }, { status: 500 });
  }
}
