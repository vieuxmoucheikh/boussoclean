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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de l\'utilisateur manquant' }, { status: 400 });
    }
    
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
    
    // Get user details
    const userSql = `
      SELECT id, name, email, role, "createdAt", "updatedAt"
      FROM "User"
      WHERE id = $1
    `;
    
    const userResult = await query(userSql, [id]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    const user = userResult.rows[0];
    
    // Get user's devis
    const devisSql = `
      SELECT 
        id, nom, prenom, email, telephone, "datePreferee", 
        statut, "montantTotal", "createdAt"
      FROM "Devis"
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC
    `;
    
    const devisResult = await query(devisSql, [id]);
    
    // Get user's reviews
    const avisSql = `
      SELECT 
        a.*,
        s.nom as "serviceName"
      FROM "Avis" a
      LEFT JOIN "Service" s ON a."serviceId" = s.id
      WHERE a."userId" = $1
      ORDER BY a."createdAt" DESC
    `;
    
    const avisResult = await query(avisSql, [id]);
    
    return NextResponse.json({
      user,
      devis: devisResult.rows,
      avis: avisResult.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des détails de l\'utilisateur' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de l\'utilisateur manquant' }, { status: 400 });
    }
    
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
    const { name, email, password, role } = data;
    
    // Check if user exists
    const checkUserSql = `
      SELECT * FROM "User"
      WHERE id = $1
    `;
    
    const checkUserResult = await query(checkUserSql, [id]);
    
    if (checkUserResult.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Check if email is already used by another user
    if (email) {
      const checkEmailSql = `
        SELECT * FROM "User"
        WHERE email = $1 AND id != $2
      `;
      
      const checkEmailResult = await query(checkEmailSql, [email, id]);
      
      if (checkEmailResult.rows.length > 0) {
        return NextResponse.json({ error: 'Cet email est déjà utilisé par un autre utilisateur' }, { status: 400 });
      }
    }
    
    // Build update SQL dynamically based on provided fields
    let updateFields = [];
    let updateParams = [];
    let paramIndex = 1;
    
    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex}`);
      updateParams.push(name);
      paramIndex++;
    }
    
    if (email !== undefined) {
      updateFields.push(`email = $${paramIndex}`);
      updateParams.push(email);
      paramIndex++;
    }
    
    if (role !== undefined) {
      updateFields.push(`role = $${paramIndex}`);
      updateParams.push(role);
      paramIndex++;
    }
    
    // Add updated timestamp
    updateFields.push(`"updatedAt" = $${paramIndex}`);
    updateParams.push(new Date());
    paramIndex++;
    
    // Add ID as the last parameter
    updateParams.push(id);
    
    if (updateFields.length === 1 && updateFields[0].startsWith('"updatedAt"')) {
      return NextResponse.json({ error: 'Aucun champ à mettre à jour' }, { status: 400 });
    }
    
    // Update user
    const updateUserSql = `
      UPDATE "User"
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex - 1}
      RETURNING *
    `;
    
    const updateUserResult = await query(updateUserSql, updateParams);
    
    // Update password if provided
    if (password) {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update account
      const updateAccountSql = `
        UPDATE "Account"
        SET access_token = $1
        WHERE "userId" = $2 AND provider = 'credentials'
      `;
      
      await query(updateAccountSql, [hashedPassword, id]);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      user: updateUserResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de l\'utilisateur manquant' }, { status: 400 });
    }
    
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
    
    // Check if user exists
    const checkUserSql = `
      SELECT * FROM "User"
      WHERE id = $1
    `;
    
    const checkUserResult = await query(checkUserSql, [id]);
    
    if (checkUserResult.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Check if user is an admin
    if (checkUserResult.rows[0].role === 'ADMIN') {
      // Count admins
      const adminCountSql = `
        SELECT COUNT(*) as count
        FROM "User"
        WHERE role = 'ADMIN'
      `;
      
      const adminCountResult = await query(adminCountSql);
      
      if (parseInt(adminCountResult.rows[0].count) <= 1) {
        return NextResponse.json({ error: 'Impossible de supprimer le dernier administrateur' }, { status: 400 });
      }
    }
    
    // Delete user data in a transaction
    const client = (await query('BEGIN')).client;
    
    try {
      // Delete user's reviews
      const deleteAvisSql = `
        DELETE FROM "Avis"
        WHERE "userId" = $1
      `;
      
      await client.query(deleteAvisSql, [id]);
      
      // Update devis to remove user association
      const updateDevisSql = `
        UPDATE "Devis"
        SET "userId" = NULL
        WHERE "userId" = $1
      `;
      
      await client.query(updateDevisSql, [id]);
      
      // Delete user's accounts
      const deleteAccountsSql = `
        DELETE FROM "Account"
        WHERE "userId" = $1
      `;
      
      await client.query(deleteAccountsSql, [id]);
      
      // Delete user's sessions
      const deleteSessionsSql = `
        DELETE FROM "Session"
        WHERE "userId" = $1
      `;
      
      await client.query(deleteSessionsSql, [id]);
      
      // Delete user
      const deleteUserSql = `
        DELETE FROM "User"
        WHERE id = $1
        RETURNING id
      `;
      
      const deleteUserResult = await client.query(deleteUserSql, [id]);
      
      // Commit transaction
      await client.query('COMMIT');
      
      return NextResponse.json({
        success: true,
        message: 'Utilisateur supprimé avec succès',
        id: deleteUserResult.rows[0].id
      });
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur' }, { status: 500 });
  }
}
