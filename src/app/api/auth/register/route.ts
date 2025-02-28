import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { getPool, query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }
    
    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères' }, { status: 400 });
    }
    
    // Check if user already exists
    const checkUserSql = 'SELECT * FROM "User" WHERE email = $1';
    const existingUserResult = await query(checkUserSql, [email]);
    
    if (existingUserResult.rows.length > 0) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Get a client for transaction
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      // Start transaction
      await client.query('BEGIN');
      
      // Create user ID
      const userId = `user_${Date.now()}`;
      
      // Create the user
      const createUserSql = `
        INSERT INTO "User" (id, name, email, "emailVerified", image)
        VALUES ($1, $2, $3, NULL, NULL)
        RETURNING *
      `;
      
      const userResult = await client.query(createUserSql, [userId, name, email]);
      const user = userResult.rows[0];
      
      // Create credentials account with hashed password
      const createAccountSql = `
        INSERT INTO "Account" (
          id, "userId", type, provider, "providerAccountId", 
          refresh_token, access_token, expires_at, token_type, scope, id_token, session_state
        )
        VALUES ($1, $2, $3, $4, $5, NULL, $6, NULL, NULL, NULL, NULL, NULL)
      `;
      
      await client.query(createAccountSql, [
        `acc_${Date.now()}`,
        userId,
        'credentials',
        'credentials',
        email,
        hashedPassword // Store hashed password in access_token field
      ]);
      
      // Commit transaction
      await client.query('COMMIT');
      
      // Remove sensitive data
      const userWithoutId = { 
        name: user.name,
        email: user.email
      };
      
      return NextResponse.json({ 
        message: 'Utilisateur créé avec succès',
        user: userWithoutId 
      });
      
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release client back to pool
      client.release();
    }
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
  }
}
