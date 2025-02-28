import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPool, query } from '@/lib/db';

// Define a type that includes the fields we need
interface ReservationWithItems {
  id: string;
  dateService: Date;
  heureService: string;
  statut: string;
  montantTotal: number;
  adresse: string;
  codePostal: string;
  ville: string;
  commentaire: string | null;
  userId: string;
  items: {
    id: string;
    quantite: number;
    prix: number;
    service: {
      id: string;
      nom: string;
      description: string;
      prix: number;
      unite: string | null;
      image: string | null;
      categorie: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reservationId = params.id;
    
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
    
    // Get the specific reservation with its items
    const reservationSql = `
      SELECT 
        r.id, r."dateService", r."heureService", r.statut, r."montantTotal",
        r.adresse, r."codePostal", r.ville, r.commentaire, r."userId",
        ri.id as item_id, ri.quantite, ri.prix, ri."serviceId",
        s.id as service_id, s.nom, s.description, s.prix as service_prix, 
        s.unite, s.image, s.categorie, s."createdAt", s."updatedAt"
      FROM "Reservation" r
      LEFT JOIN "ReservationItem" ri ON r.id = ri."reservationId"
      LEFT JOIN "Service" s ON ri."serviceId" = s.id
      WHERE r.id = $1
    `;
    
    const reservationResult = await query(reservationSql, [reservationId]);
    
    // Check if the reservation exists
    if (reservationResult.rows.length === 0) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
    
    // Check if the reservation belongs to the user
    if (reservationResult.rows[0].userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Process the results to format the reservation with its items
    const firstRow = reservationResult.rows[0];
    const services = reservationResult.rows.map(row => ({
      id: row.service_id,
      nom: row.nom,
      prix: row.prix,
      description: row.description,
    }));
    
    // Format the reservation for the client
    const formattedReservation = {
      id: firstRow.id,
      date: firstRow.dateService,
      heure: firstRow.heureService,
      statut: firstRow.statut,
      montantTotal: firstRow.montantTotal,
      adresse: firstRow.adresse,
      codePostal: firstRow.codePostal,
      ville: firstRow.ville,
      commentaire: firstRow.commentaire,
      services,
    };
    
    return NextResponse.json(formattedReservation);
  } catch (error) {
    console.error('Error fetching reservation details:', error);
    return NextResponse.json({ error: 'Error fetching reservation details' }, { status: 500 });
  }
}
