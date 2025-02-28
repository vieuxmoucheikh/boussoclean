import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userEmail = session.user.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }
    
    // Find the user by email
    const userSql = 'SELECT * FROM "User" WHERE email = $1';
    const userResult = await query(userSql, [userEmail]);
    const user = userResult.rows[0];
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get the user's reservations with service information
    const reservationsSql = `
      SELECT 
        r.id, r."dateService", r."heureService", r.statut, r."montantTotal",
        r.adresse, r."codePostal", r.ville, r.commentaire,
        ri.id as item_id, s.nom as service_nom
      FROM "Reservation" r
      LEFT JOIN "ReservationItem" ri ON r.id = ri."reservationId"
      LEFT JOIN "Service" s ON ri."serviceId" = s.id
      WHERE r."userId" = $1
      ORDER BY r."createdAt" DESC
    `;
    
    const reservationsResult = await query(reservationsSql, [user.id]);
    
    // Process the results to group by reservation
    const reservationsMap = new Map();
    
    reservationsResult.rows.forEach(row => {
      if (!reservationsMap.has(row.id)) {
        reservationsMap.set(row.id, {
          id: row.id,
          date: row.dateService,
          heure: row.heureService,
          statut: row.statut,
          montantTotal: row.montantTotal,
          adresse: row.adresse,
          codePostal: row.codePostal,
          ville: row.ville,
          commentaire: row.commentaire,
          services: []
        });
      }
      
      // Add service if it exists and is not already in the array
      if (row.service_nom) {
        const reservation = reservationsMap.get(row.id);
        const serviceExists = reservation.services.some((s: { nom: string }) => s.nom === row.service_nom);
        
        if (!serviceExists) {
          reservation.services.push({
            nom: row.service_nom
          });
        }
      }
    });
    
    // Convert map to array
    const formattedReservations = Array.from(reservationsMap.values());
    
    return NextResponse.json(formattedReservations);
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return NextResponse.json({ error: 'Error fetching reservations' }, { status: 500 });
  }
}
