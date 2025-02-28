import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de réservation manquant' }, { status: 400 });
    }
    
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
    
    // Get devis with items and services
    // In a real implementation, you would check if the user is an admin
    // or if the devis belongs to the user
    const devisSql = `
      SELECT 
        d.*, 
        di.id as item_id, di.quantite, di.prix, di."serviceId",
        s.id as service_id, s.nom as service_nom, s.description as service_description,
        s.prix as service_prix, s.unite as service_unite, s.image as service_image,
        s.categorie as service_categorie
      FROM "Devis" d
      LEFT JOIN "DevisItem" di ON d.id = di."devisId"
      LEFT JOIN "Service" s ON di."serviceId" = s.id
      WHERE d.id = $1 AND d."userId" = $2
    `;
    
    const devisResult = await query(devisSql, [id, userId]);
    
    if (devisResult.rows.length === 0) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    
    // Process the results to format the devis with items
    const firstRow = devisResult.rows[0];
    const devis = {
      id: firstRow.id,
      nom: firstRow.nom,
      prenom: firstRow.prenom,
      email: firstRow.email,
      telephone: firstRow.telephone,
      adresse: firstRow.adresse,
      codePostal: firstRow.codePostal,
      ville: firstRow.ville,
      datePreferee: firstRow.datePreferee,
      message: firstRow.message,
      statut: firstRow.statut,
      montantTotal: firstRow.montantTotal,
      createdAt: firstRow.createdAt,
      updatedAt: firstRow.updatedAt,
      userId: firstRow.userId,
      items: []
    };
    
    // Add items
    devisResult.rows.forEach(row => {
      if (row.item_id) {
        devis.items.push({
          id: row.item_id,
          quantite: row.quantite,
          prix: row.prix,
          service: {
            id: row.service_id,
            nom: row.service_nom,
            description: row.service_description,
            prix: row.service_prix,
            unite: row.service_unite,
            image: row.service_image,
            categorie: row.service_categorie
          }
        });
      }
    });
    
    return NextResponse.json(devis);
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération de la réservation' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de réservation manquant' }, { status: 400 });
    }
    
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
    
    // Get data from request
    const data = await request.json();
    const { statut } = data;
    
    if (!statut) {
      return NextResponse.json({ error: 'Statut manquant' }, { status: 400 });
    }
    
    // Check if devis exists and belongs to user
    const checkDevisSql = `
      SELECT * FROM "Devis"
      WHERE id = $1 AND "userId" = $2
    `;
    
    const checkDevisResult = await query(checkDevisSql, [id, userId]);
    
    if (checkDevisResult.rows.length === 0) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    
    // Update devis status
    const updateDevisSql = `
      UPDATE "Devis"
      SET statut = $1, "updatedAt" = $2
      WHERE id = $3 AND "userId" = $4
      RETURNING *
    `;
    
    const now = new Date();
    const updateDevisResult = await query(updateDevisSql, [statut, now, id, userId]);
    
    return NextResponse.json({
      success: true,
      message: 'Statut de la réservation mis à jour avec succès',
      devis: updateDevisResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour de la réservation' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID de réservation manquant' }, { status: 400 });
    }
    
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
    
    // Check if devis exists and belongs to user
    const checkDevisSql = `
      SELECT * FROM "Devis"
      WHERE id = $1 AND "userId" = $2
    `;
    
    const checkDevisResult = await query(checkDevisSql, [id, userId]);
    
    if (checkDevisResult.rows.length === 0) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    
    // Delete devis items first
    const deleteDevisItemsSql = `
      DELETE FROM "DevisItem"
      WHERE "devisId" = $1
    `;
    
    await query(deleteDevisItemsSql, [id]);
    
    // Delete devis
    const deleteDevisSql = `
      DELETE FROM "Devis"
      WHERE id = $1 AND "userId" = $2
      RETURNING id
    `;
    
    const deleteDevisResult = await query(deleteDevisSql, [id, userId]);
    
    return NextResponse.json({
      success: true,
      message: 'Réservation supprimée avec succès',
      id: deleteDevisResult.rows[0].id
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la suppression de la réservation' }, { status: 500 });
  }
}
