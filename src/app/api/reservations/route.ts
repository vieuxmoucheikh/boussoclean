import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPool, query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const data = await request.json();
    const { 
      nom, 
      prenom, 
      email, 
      telephone, 
      adresse, 
      codePostal, 
      ville, 
      date, 
      heure, 
      message, 
      selectedServices 
    } = data;
    
    // Validate required fields
    if (!nom || !prenom || !email || !telephone || !adresse || !codePostal || !ville || !date || !heure || !selectedServices || selectedServices.length === 0) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Get authenticated user if available
    const session = await getServerSession(authOptions);
    let userId = null;
    
    if (session?.user?.email) {
      const userSql = 'SELECT id FROM "User" WHERE email = $1';
      const userResult = await query(userSql, [session.user.email]);
      if (userResult.rows.length > 0) {
        userId = userResult.rows[0].id;
      }
    }
    
    // Get a client for transaction
    const pool = getPool();
    const client = await pool.connect();
    
    try {
      // Start transaction
      await client.query('BEGIN');
      
      // Generate a unique ID for the devis
      const devisId = `devis_${Date.now()}`;
      
      // For now, store as a Devis (quote) rather than a Reservation
      // Since Reservation requires authentication
      const createDevisSql = `
        INSERT INTO "Devis" (
          id, nom, prenom, email, telephone, adresse, "codePostal", ville, 
          "datePreferee", message, statut, "userId", "createdAt", "updatedAt", "montantTotal"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *
      `;
      
      const now = new Date();
      const devisParams = [
        devisId,
        nom,
        prenom,
        email,
        telephone,
        adresse,
        codePostal,
        ville,
        new Date(date),
        message,
        'en_attente',
        userId,
        now,
        now,
        0 // Initial montantTotal, will update later
      ];
      
      const devisResult = await client.query(createDevisSql, devisParams);
      const devis = devisResult.rows[0];
      
      // Get service details from database
      const servicesSql = `
        SELECT * FROM "Service" 
        WHERE id = ANY($1::text[])
      `;
      
      const servicesResult = await client.query(servicesSql, [selectedServices]);
      const services = servicesResult.rows;
      
      // Calculate total amount
      let montantTotal = 0;
      
      // Create devis items for each selected service
      for (const serviceId of selectedServices) {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          // We're using a default quantity of 1 for now
          // In a real implementation, you'd capture quantities per service
          const quantite = 1;
          const prix = service.prix * quantite;
          montantTotal += prix;
          
          const createDevisItemSql = `
            INSERT INTO "DevisItem" (
              id, "devisId", "serviceId", quantite, prix
            )
            VALUES ($1, $2, $3, $4, $5)
          `;
          
          await client.query(createDevisItemSql, [
            `devisitem_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            devisId,
            service.id,
            quantite,
            prix
          ]);
        }
      }
      
      // Update the total amount
      const updateDevisSql = `
        UPDATE "Devis"
        SET "montantTotal" = $1
        WHERE id = $2
      `;
      
      await client.query(updateDevisSql, [montantTotal, devisId]);
      
      // Commit transaction
      await client.query('COMMIT');
      
      // In a real implementation, you would send confirmation emails here
      
      return NextResponse.json({ 
        success: true, 
        message: 'Demande de réservation créée avec succès',
        devisId: devis.id 
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
    console.error('Erreur lors de la création de la réservation:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création de votre réservation' }, { status: 500 });
  }
}

// Get all reservations (admin only in a real implementation)
export async function GET() {
  try {
    // In a real implementation, check if user is admin
    // For now, just return a limited set of devis
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
      ORDER BY d."createdAt" DESC
      LIMIT 10
    `;
    
    const devisResult = await query(devisSql);
    
    // Process the results to group by devis
    const devisMap = new Map();
    
    devisResult.rows.forEach(row => {
      if (!devisMap.has(row.id)) {
        devisMap.set(row.id, {
          id: row.id,
          nom: row.nom,
          prenom: row.prenom,
          email: row.email,
          telephone: row.telephone,
          adresse: row.adresse,
          codePostal: row.codePostal,
          ville: row.ville,
          datePreferee: row.datePreferee,
          message: row.message,
          statut: row.statut,
          montantTotal: row.montantTotal,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          userId: row.userId,
          items: []
        });
      }
      
      // Add item if it exists
      if (row.item_id) {
        const devis = devisMap.get(row.id);
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
    
    // Convert map to array
    const formattedDevis = Array.from(devisMap.values());
    
    return NextResponse.json(formattedDevis);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des réservations' }, { status: 500 });
  }
}
