import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'ID du service est obligatoire' }, { status: 400 });
    }
    
    const sql = 'SELECT * FROM "Service" WHERE id = $1';
    const result = await query(sql, [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du service' }, { status: 500 });
  }
}
