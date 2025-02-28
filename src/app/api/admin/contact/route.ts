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
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const lu = searchParams.get('lu');
    
    // Build query
    let contactSql = `
      SELECT *
      FROM "Contact"
    `;
    
    const params: any[] = [];
    
    if (lu !== null) {
      contactSql += ` WHERE lu = $1`;
      params.push(lu === 'true');
    }
    
    contactSql += ` ORDER BY "createdAt" DESC`;
    
    const contactResult = await query(contactSql, params);
    
    return NextResponse.json(contactResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages de contact:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des messages de contact' }, { status: 500 });
  }
}
