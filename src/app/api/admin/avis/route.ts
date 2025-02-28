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
    
    // Get all reviews, including unpublished ones
    const avisSql = `
      SELECT 
        a.*,
        u.name as "userName", u.email as "userEmail",
        s.nom as "serviceName"
      FROM "Avis" a
      LEFT JOIN "User" u ON a."userId" = u.id
      LEFT JOIN "Service" s ON a."serviceId" = s.id
      ORDER BY a."createdAt" DESC
    `;
    
    const avisResult = await query(avisSql);
    
    return NextResponse.json(avisResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des avis' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
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
    
    // Get data from request
    const data = await request.json();
    const { id, publie } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de l\'avis manquant' }, { status: 400 });
    }
    
    if (publie === undefined) {
      return NextResponse.json({ error: 'Statut de publication manquant' }, { status: 400 });
    }
    
    // Update review publication status
    const updateAvisSql = `
      UPDATE "Avis"
      SET publie = $1, "updatedAt" = $2
      WHERE id = $3
      RETURNING *
    `;
    
    const now = new Date();
    const updateAvisResult = await query(updateAvisSql, [publie, now, id]);
    
    if (updateAvisResult.rows.length === 0) {
      return NextResponse.json({ error: 'Avis non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: publie ? 'Avis publié avec succès' : 'Avis masqué avec succès',
      avis: updateAvisResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'avis:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour de l\'avis' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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
    
    // Get data from request
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID de l\'avis manquant' }, { status: 400 });
    }
    
    // Delete review
    const deleteAvisSql = `
      DELETE FROM "Avis"
      WHERE id = $1
      RETURNING id
    `;
    
    const deleteAvisResult = await query(deleteAvisSql, [id]);
    
    if (deleteAvisResult.rows.length === 0) {
      return NextResponse.json({ error: 'Avis non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Avis supprimé avec succès',
      id: deleteAvisResult.rows[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'avis:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression de l\'avis' }, { status: 500 });
  }
}
