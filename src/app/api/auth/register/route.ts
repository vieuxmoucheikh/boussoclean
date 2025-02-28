import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/db';
import { PrismaClient } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }
    
    if (password.length < 8) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères' }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user with transaction to ensure both user and account are created
    const user = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
        },
      });
      
      // Create credentials account with hashed password
      await tx.account.create({
        data: {
          userId: newUser.id,
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: email,
          access_token: hashedPassword, // Store hashed password in access_token field
        },
      });
      
      return newUser;
    });
    
    // Remove sensitive data
    const userWithoutId = { 
      name: user.name,
      email: user.email
    };
    
    return NextResponse.json({ 
      message: 'Utilisateur créé avec succès',
      user: userWithoutId 
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
  }
}
