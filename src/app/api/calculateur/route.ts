import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const data = await request.json();
    const { 
      surface, 
      typeBien, 
      frequence, 
      options,
      serviceIds
    } = data;
    
    // Validate required fields
    if (!surface || !typeBien || !frequence) {
      return NextResponse.json({ error: 'Tous les champs obligatoires doivent être remplis' }, { status: 400 });
    }
    
    // Get base price per m² based on property type
    let prixBaseM2 = 0;
    switch (typeBien) {
      case 'appartement':
        prixBaseM2 = 0.35;
        break;
      case 'maison':
        prixBaseM2 = 0.40;
        break;
      case 'bureau':
        prixBaseM2 = 0.45;
        break;
      case 'commerce':
        prixBaseM2 = 0.50;
        break;
      default:
        prixBaseM2 = 0.35;
    }
    
    // Apply frequency multiplier
    let frequenceMultiplier = 1;
    switch (frequence) {
      case 'ponctuel':
        frequenceMultiplier = 1.2;
        break;
      case 'hebdomadaire':
        frequenceMultiplier = 0.9;
        break;
      case 'bi_hebdomadaire':
        frequenceMultiplier = 0.85;
        break;
      case 'mensuel':
        frequenceMultiplier = 1;
        break;
      default:
        frequenceMultiplier = 1;
    }
    
    // Calculate base price
    let prixBase = surface * prixBaseM2 * frequenceMultiplier;
    
    // Apply options
    let optionsTotal = 0;
    if (options) {
      if (options.includes('vitres')) optionsTotal += 30;
      if (options.includes('tapis')) optionsTotal += 25;
      if (options.includes('meubles')) optionsTotal += 20;
      if (options.includes('desinfection')) optionsTotal += 40;
    }
    
    // Get prices for specific services if serviceIds provided
    let servicesTotal = 0;
    if (serviceIds && serviceIds.length > 0) {
      const servicesSql = `
        SELECT * FROM "Service" 
        WHERE id = ANY($1::text[])
      `;
      
      const servicesResult = await query(servicesSql, [serviceIds]);
      const services = servicesResult.rows;
      
      services.forEach(service => {
        servicesTotal += service.prix;
      });
    }
    
    // Calculate total price
    const prixTotal = prixBase + optionsTotal + servicesTotal;
    
    // Round to 2 decimal places
    const prixTotalArrondi = Math.round(prixTotal * 100) / 100;
    
    return NextResponse.json({ 
      success: true,
      prix: {
        base: Math.round(prixBase * 100) / 100,
        options: optionsTotal,
        services: servicesTotal,
        total: prixTotalArrondi
      },
      details: {
        surface,
        typeBien,
        frequence,
        prixBaseM2,
        frequenceMultiplier
      }
    });
    
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors du calcul du prix' }, { status: 500 });
  }
}
