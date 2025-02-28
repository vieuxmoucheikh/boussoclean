import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const data = await request.json();
    const { nom, prenom, email, telephone, message, sujet } = data;
    
    // Validate required fields
    if (!nom || !prenom || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Create contact message
    const createContactSql = `
      INSERT INTO "Contact" (
        id, nom, prenom, email, telephone, message, sujet, "createdAt", "updatedAt", lu
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    
    const now = new Date();
    const contactId = `contact_${Date.now()}`;
    
    const createContactResult = await query(createContactSql, [
      contactId,
      nom,
      prenom,
      email,
      telephone || null,
      message,
      sujet || 'Demande d\'information',
      now,
      now,
      false // Not read yet
    ]);
    
    // In a real implementation, you would send an email notification here
    
    return NextResponse.json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès',
      contact: createContactResult.rows[0]
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de l\'envoi de votre message' }, { status: 500 });
  }
}
