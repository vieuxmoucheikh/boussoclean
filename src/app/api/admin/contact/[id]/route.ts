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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du message manquant' }, { status: 400 });
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
    
    // Get contact message
    const contactSql = `
      SELECT *
      FROM "Contact"
      WHERE id = $1
    `;
    
    const contactResult = await query(contactSql, [id]);
    
    if (contactResult.rows.length === 0) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    }
    
    // Mark as read if not already
    if (!contactResult.rows[0].lu) {
      const updateContactSql = `
        UPDATE "Contact"
        SET lu = true, "updatedAt" = $1
        WHERE id = $2
      `;
      
      await query(updateContactSql, [new Date(), id]);
    }
    
    return NextResponse.json(contactResult.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du message de contact:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération du message de contact' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du message manquant' }, { status: 400 });
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
    const { lu, reponse } = data;
    
    // Check if contact message exists
    const checkContactSql = `
      SELECT * FROM "Contact"
      WHERE id = $1
    `;
    
    const checkContactResult = await query(checkContactSql, [id]);
    
    if (checkContactResult.rows.length === 0) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    }
    
    // Build update SQL dynamically based on provided fields
    let updateFields = [];
    let updateParams = [];
    let paramIndex = 1;
    
    if (lu !== undefined) {
      updateFields.push(`lu = $${paramIndex}`);
      updateParams.push(lu);
      paramIndex++;
    }
    
    if (reponse !== undefined) {
      updateFields.push(`reponse = $${paramIndex}`);
      updateParams.push(reponse);
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
    
    // Update contact message
    const updateContactSql = `
      UPDATE "Contact"
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex - 1}
      RETURNING *
    `;
    
    const updateContactResult = await query(updateContactSql, updateParams);
    
    return NextResponse.json({
      success: true,
      message: 'Message mis à jour avec succès',
      contact: updateContactResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message de contact:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour du message de contact' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du message manquant' }, { status: 400 });
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
    
    // Check if contact message exists
    const checkContactSql = `
      SELECT * FROM "Contact"
      WHERE id = $1
    `;
    
    const checkContactResult = await query(checkContactSql, [id]);
    
    if (checkContactResult.rows.length === 0) {
      return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
    }
    
    // Delete contact message
    const deleteContactSql = `
      DELETE FROM "Contact"
      WHERE id = $1
      RETURNING id
    `;
    
    const deleteContactResult = await query(deleteContactSql, [id]);
    
    return NextResponse.json({
      success: true,
      message: 'Message supprimé avec succès',
      id: deleteContactResult.rows[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du message de contact:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression du message de contact' }, { status: 500 });
  }
}
