import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';
import * as bcrypt from 'bcrypt';

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
    
    // Get all users with stats
    const usersSql = `
      SELECT 
        u.id, u.name, u.email, u.role, u."createdAt", u."updatedAt",
        COUNT(DISTINCT d.id) as devis_count,
        COUNT(DISTINCT a.id) as avis_count
      FROM "User" u
      LEFT JOIN "Devis" d ON u.id = d."userId"
      LEFT JOIN "Avis" a ON u.id = a."userId"
      GROUP BY u.id
      ORDER BY u."createdAt" DESC
    `;
    
    const usersResult = await query(usersSql);
    
    return NextResponse.json(usersResult.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' }, { status: 500 });
  }
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
    const { name, email, password, role } = data;
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Check if email already exists
    const checkEmailSql = `
      SELECT * FROM "User"
      WHERE email = $1
    `;
    
    const checkEmailResult = await query(checkEmailSql, [email]);
    
    if (checkEmailResult.rows.length > 0) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user and account in a transaction
    const client = (await query('BEGIN')).client;
    
    try {
      // Generate unique IDs
      const userId = `user_${Date.now()}`;
      const accountId = `account_${Date.now()}`;
      const now = new Date();
      
      // Create user
      const createUserSql = `
        INSERT INTO "User" (
          id, name, email, role, "createdAt", "updatedAt"
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      
      const userParams = [
        userId,
        name,
        email,
        role || 'USER',
        now,
        now
      ];
      
      const userResult = await client.query(createUserSql, userParams);
      
      // Create account with credentials
      const createAccountSql = `
        INSERT INTO "Account" (
          id, "userId", type, provider, "providerAccountId", 
          access_token, refresh_token, expires_at, token_type, scope, 
          id_token, session_state
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      
      const accountParams = [
        accountId,
        userId,
        'credentials',
        'credentials',
        email,
        hashedPassword, // Store hashed password in access_token
        null,
        null,
        null,
        null,
        null,
        null
      ];
      
      await client.query(createAccountSql, accountParams);
      
      // Commit transaction
      await client.query('COMMIT');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Utilisateur créé avec succès',
        user: userResult.rows[0]
      });
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur' }, { status: 500 });
  }
}
