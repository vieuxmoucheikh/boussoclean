import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPool, query } from '@/lib/db';
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
    const userSql = `
      SELECT u.*, a.id as account_id, a.access_token 
      FROM "User" u
      LEFT JOIN "Account" a ON u.id = a."userId" AND a.provider = 'credentials'
      WHERE u.email = $1
    `;
    
    const userResult = await query(userSql, [userEmail]);
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const user = userResult.rows[0];
    
    // If user is trying to change password, verify the current password
    if (currentPassword && newPassword) {
      // Check if credentials account exists
      if (!user.account_id || !user.access_token) {
        return NextResponse.json({ error: 'No credentials account found' }, { status: 400 });
      }
      
      // Verify the current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.access_token || '');
      
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });
      }
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update the password in the credentials account
      const updatePasswordSql = `
        UPDATE "Account"
        SET access_token = $1
        WHERE id = $2
      `;
      
      await query(updatePasswordSql, [hashedPassword, user.account_id]);
    }
    
    // Update the user's name
    const updateUserSql = `
      UPDATE "User"
      SET name = $1
      WHERE id = $2
      RETURNING id, name, email
    `;
    
    const updatedUserResult = await query(updateUserSql, [name, user.id]);
    const updatedUser = updatedUserResult.rows[0];
    
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
