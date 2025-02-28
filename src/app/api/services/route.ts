import { NextRequest, NextResponse } from 'next/server';
import { getPool, query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    // Build the SQL query based on the category filter
    let sql = 'SELECT * FROM "Service" ';
    const values: any[] = [];
    
    if (category) {
      sql += 'WHERE categorie = $1 ';
      values.push(category);
    }
    
    sql += 'ORDER BY nom ASC';
    
    // Execute the query
    const result = await query(sql, values);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you would check if the user is an admin here
    
    const data = await request.json();
    const { nom, description, prix, unite, image, category } = data;
    
    // Validation
    if (!nom || !description || !prix) {
      return NextResponse.json({ error: 'Nom, description et prix sont obligatoires' }, { status: 400 });
    }
    
    // Insert the service into the database
    const sql = `
      INSERT INTO "Service" (
        id, nom, description, prix, unite, image, categorie, "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) RETURNING *
    `;
    
    const values = [
      `svc_${Date.now()}`, // Generate a unique ID
      nom,
      description,
      parseFloat(prix),
      unite || null,
      image || null,
      category || null,
      new Date(),
      new Date()
    ];
    
    const result = await query(sql, values);
    const service = result.rows[0];
    
    return NextResponse.json({ 
      message: 'Service créé avec succès',
      service
    });
    
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // In a real implementation, you would check if the user is an admin here
    
    const data = await request.json();
    const { id, nom, description, prix, unite, image, category } = data;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du service est obligatoire' }, { status: 400 });
    }
    
    // Build the update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [id]; // First parameter is always the ID
    let paramIndex = 2; // Start from $2 since $1 is the ID
    
    if (nom !== undefined) {
      updates.push(`nom = $${paramIndex}`);
      values.push(nom);
      paramIndex++;
    }
    
    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(description);
      paramIndex++;
    }
    
    if (prix !== undefined) {
      updates.push(`prix = $${paramIndex}`);
      values.push(parseFloat(prix.toString()));
      paramIndex++;
    }
    
    if (unite !== undefined) {
      updates.push(`unite = $${paramIndex}`);
      values.push(unite);
      paramIndex++;
    }
    
    if (image !== undefined) {
      updates.push(`image = $${paramIndex}`);
      values.push(image);
      paramIndex++;
    }
    
    if (category !== undefined) {
      updates.push(`categorie = $${paramIndex}`);
      values.push(category);
      paramIndex++;
    }
    
    // Always update the updatedAt timestamp
    updates.push(`"updatedAt" = $${paramIndex}`);
    values.push(new Date());
    
    if (updates.length === 1) {
      // Only updatedAt was added, no real changes
      return NextResponse.json({ error: 'Aucune donnée à mettre à jour' }, { status: 400 });
    }
    
    const sql = `
      UPDATE "Service"
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await query(sql, values);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    const updatedService = result.rows[0];
    
    return NextResponse.json({ 
      message: 'Service mis à jour avec succès',
      service: updatedService
    });
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // In a real implementation, you would check if the user is an admin here
    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID du service est obligatoire' }, { status: 400 });
    }
    
    // Check if the service is referenced in any DevisItem or ReservationItem
    const checkSql = `
      SELECT 
        (SELECT COUNT(*) FROM "DevisItem" WHERE "serviceId" = $1) as devis_count,
        (SELECT COUNT(*) FROM "ReservationItem" WHERE "serviceId" = $1) as reservation_count
    `;
    
    const checkResult = await query(checkSql, [id]);
    const { devis_count, reservation_count } = checkResult.rows[0];
    
    if (parseInt(devis_count) > 0 || parseInt(reservation_count) > 0) {
      return NextResponse.json({ 
        error: 'Impossible de supprimer ce service car il est utilisé dans des devis ou des réservations' 
      }, { status: 400 });
    }
    
    // Delete the service
    const deleteSql = 'DELETE FROM "Service" WHERE id = $1 RETURNING *';
    const result = await query(deleteSql, [id]);
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Service supprimé avec succès',
      service: result.rows[0]
    });
    
  } catch (error) {
    console.error('Erreur lors de la suppression du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du service' }, { status: 500 });
  }
}
