import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function PUT(request: NextRequest) {
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
    
    // Parse the request body
    const { name, currentPassword, newPassword } = await request.json();
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        accounts: {
          where: {
            provider: 'credentials',
          },
        },
      },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // If user is trying to change password, verify the current password
    if (currentPassword && newPassword) {
      // Get the credentials account
      const credentialsAccount = user.accounts.find(account => account.provider === 'credentials');
      
      if (!credentialsAccount) {
        return NextResponse.json({ error: 'No credentials account found' }, { status: 400 });
      }
      
      // Verify the current password
      const isPasswordValid = await bcrypt.compare(currentPassword, credentialsAccount.access_token || '');
      
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });
      }
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update the password in the credentials account
      await prisma.account.update({
        where: { id: credentialsAccount.id },
        data: {
          access_token: hashedPassword,
        },
      });
    }
    
    // Update the user's name
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name },
    });
    
    // Return the updated user (excluding sensitive information)
    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: 'Profile updated successfully',
    });
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
  }
}
