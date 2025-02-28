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
      return NextResponse.json({ error: 'ID du service manquant' }, { status: 400 });
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
    
    // Get service details with stats
    const serviceSql = `
      SELECT 
        s.*,
        COUNT(DISTINCT di."devisId") as devis_count,
        COUNT(DISTINCT a.id) as avis_count,
        COALESCE(AVG(a.note), 0) as note_moyenne
      FROM "Service" s
      LEFT JOIN "DevisItem" di ON s.id = di."serviceId"
      LEFT JOIN "Avis" a ON s.id = a."serviceId"
      WHERE s.id = $1
      GROUP BY s.id
    `;
    
    const serviceResult = await query(serviceSql, [id]);
    
    if (serviceResult.rows.length === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    // Get related devis
    const devisSql = `
      SELECT DISTINCT
        d.id, d.nom, d.prenom, d.email, d.telephone, d."datePreferee", d.statut, d."montantTotal", d."createdAt"
      FROM "Devis" d
      JOIN "DevisItem" di ON d.id = di."devisId"
      WHERE di."serviceId" = $1
      ORDER BY d."createdAt" DESC
      LIMIT 10
    `;
    
    const devisResult = await query(devisSql, [id]);
    
    // Get reviews
    const avisSql = `
      SELECT 
        a.*,
        u.name as "userName"
      FROM "Avis" a
      LEFT JOIN "User" u ON a."userId" = u.id
      WHERE a."serviceId" = $1
      ORDER BY a."createdAt" DESC
    `;
    
    const avisResult = await query(avisSql, [id]);
    
    // Return combined data
    return NextResponse.json({
      service: serviceResult.rows[0],
      devis: devisResult.rows,
      avis: avisResult.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du service:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération du service' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du service manquant' }, { status: 400 });
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
    const { nom, description, prix, unite, image, categorie } = data;
    
    // Check if service exists
    const checkServiceSql = `
      SELECT * FROM "Service"
      WHERE id = $1
    `;
    
    const checkServiceResult = await query(checkServiceSql, [id]);
    
    if (checkServiceResult.rows.length === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    // Build update SQL dynamically based on provided fields
    let updateFields = [];
    let updateParams = [];
    let paramIndex = 1;
    
    if (nom !== undefined) {
      updateFields.push(`nom = $${paramIndex}`);
      updateParams.push(nom);
      paramIndex++;
    }
    
    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex}`);
      updateParams.push(description);
      paramIndex++;
    }
    
    if (prix !== undefined) {
      updateFields.push(`prix = $${paramIndex}`);
      updateParams.push(prix);
      paramIndex++;
    }
    
    if (unite !== undefined) {
      updateFields.push(`unite = $${paramIndex}`);
      updateParams.push(unite);
      paramIndex++;
    }
    
    if (image !== undefined) {
      updateFields.push(`image = $${paramIndex}`);
      updateParams.push(image);
      paramIndex++;
    }
    
    if (categorie !== undefined) {
      updateFields.push(`categorie = $${paramIndex}`);
      updateParams.push(categorie);
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
    
    // Update service
    const updateServiceSql = `
      UPDATE "Service"
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex - 1}
      RETURNING *
    `;
    
    const updateServiceResult = await query(updateServiceSql, updateParams);
    
    return NextResponse.json({
      success: true,
      message: 'Service mis à jour avec succès',
      service: updateServiceResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du service:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour du service' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du service manquant' }, { status: 400 });
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
    
    // Check if service exists
    const checkServiceSql = `
      SELECT * FROM "Service"
      WHERE id = $1
    `;
    
    const checkServiceResult = await query(checkServiceSql, [id]);
    
    if (checkServiceResult.rows.length === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    // Check if service is used in any devis
    const checkDevisSql = `
      SELECT COUNT(*) as count
      FROM "DevisItem"
      WHERE "serviceId" = $1
    `;
    
    const checkDevisResult = await query(checkDevisSql, [id]);
    
    if (parseInt(checkDevisResult.rows[0].count) > 0) {
      return NextResponse.json({ 
        error: 'Ce service est utilisé dans des devis existants et ne peut pas être supprimé',
        count: parseInt(checkDevisResult.rows[0].count)
      }, { status: 400 });
    }
    
    // Delete reviews for this service first
    const deleteAvisSql = `
      DELETE FROM "Avis"
      WHERE "serviceId" = $1
    `;
    
    await query(deleteAvisSql, [id]);
    
    // Delete service
    const deleteServiceSql = `
      DELETE FROM "Service"
      WHERE id = $1
      RETURNING id
    `;
    
    const deleteServiceResult = await query(deleteServiceSql, [id]);
    
    return NextResponse.json({
      success: true,
      message: 'Service supprimé avec succès',
      id: deleteServiceResult.rows[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression du service' }, { status: 500 });
  }
}
