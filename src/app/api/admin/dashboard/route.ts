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

export async function GET(request: NextRequest) {
  try {
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
    
    // Get dashboard statistics
    
    // 1. Count total users
    const usersSql = `SELECT COUNT(*) as count FROM "User"`;
    const usersResult = await query(usersSql);
    const userCount = parseInt(usersResult.rows[0].count);
    
    // 2. Count total devis
    const devisSql = `SELECT COUNT(*) as count FROM "Devis"`;
    const devisResult = await query(devisSql);
    const devisCount = parseInt(devisResult.rows[0].count);
    
    // 3. Count devis by status
    const devisStatusSql = `
      SELECT statut, COUNT(*) as count 
      FROM "Devis" 
      GROUP BY statut
    `;
    const devisStatusResult = await query(devisStatusSql);
    
    // 4. Count total services
    const servicesSql = `SELECT COUNT(*) as count FROM "Service"`;
    const servicesResult = await query(servicesSql);
    const serviceCount = parseInt(servicesResult.rows[0].count);
    
    // 5. Count services by category
    const servicesCategorySql = `
      SELECT categorie, COUNT(*) as count 
      FROM "Service" 
      GROUP BY categorie
    `;
    const servicesCategoryResult = await query(servicesCategorySql);
    
    // 6. Count total reviews
    const avisSql = `SELECT COUNT(*) as count FROM "Avis"`;
    const avisResult = await query(avisSql);
    const avisCount = parseInt(avisResult.rows[0].count);
    
    // 7. Count published vs unpublished reviews
    const avisPublieSql = `
      SELECT publie, COUNT(*) as count 
      FROM "Avis" 
      GROUP BY publie
    `;
    const avisPublieResult = await query(avisPublieSql);
    
    // 8. Get recent devis
    const recentDevisSql = `
      SELECT 
        d.id, d.nom, d.prenom, d.email, d.telephone, 
        d."datePreferee", d.statut, d."montantTotal", d."createdAt"
      FROM "Devis" d
      ORDER BY d."createdAt" DESC
      LIMIT 5
    `;
    const recentDevisResult = await query(recentDevisSql);
    
    // 9. Get recent reviews
    const recentAvisSql = `
      SELECT 
        a.*,
        u.name as "userName",
        s.nom as "serviceName"
      FROM "Avis" a
      LEFT JOIN "User" u ON a."userId" = u.id
      LEFT JOIN "Service" s ON a."serviceId" = s.id
      ORDER BY a."createdAt" DESC
      LIMIT 5
    `;
    const recentAvisResult = await query(recentAvisSql);
    
    // 10. Calculate total revenue
    const revenueSql = `
      SELECT SUM("montantTotal") as total 
      FROM "Devis"
    `;
    const revenueResult = await query(revenueSql);
    const totalRevenue = parseFloat(revenueResult.rows[0].total) || 0;
    
    // 11. Calculate revenue by month (last 6 months)
    const revenueByMonthSql = `
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM("montantTotal") as total
      FROM "Devis"
      WHERE "createdAt" > NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month DESC
    `;
    const revenueByMonthResult = await query(revenueByMonthSql);
    
    // 12. Get most popular services
    const popularServicesSql = `
      SELECT 
        s.id, s.nom, s.categorie, s.prix,
        COUNT(di."devisId") as devis_count
      FROM "Service" s
      LEFT JOIN "DevisItem" di ON s.id = di."serviceId"
      GROUP BY s.id
      ORDER BY devis_count DESC
      LIMIT 5
    `;
    const popularServicesResult = await query(popularServicesSql);
    
    return NextResponse.json({
      users: {
        total: userCount
      },
      devis: {
        total: devisCount,
        byStatus: devisStatusResult.rows,
        recent: recentDevisResult.rows
      },
      services: {
        total: serviceCount,
        byCategory: servicesCategoryResult.rows,
        popular: popularServicesResult.rows
      },
      avis: {
        total: avisCount,
        byStatus: avisPublieResult.rows,
        recent: recentAvisResult.rows
      },
      revenue: {
        total: totalRevenue,
        byMonth: revenueByMonthResult.rows
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques du tableau de bord:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des statistiques' }, { status: 500 });
  }
}
