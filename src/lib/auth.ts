import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import { getPool, query } from './db';

// Define the Account type based on our database schema
type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email with credentials account
          const userSql = `
            SELECT u.*, a.id as account_id, a.access_token, a.provider, a.type
            FROM "User" u
            LEFT JOIN "Account" a ON u.id = a."userId"
            WHERE u.email = $1 AND a.provider = 'credentials'
          `;
          
          const userResult = await query(userSql, [credentials.email]);
          
          if (userResult.rows.length === 0) {
            return null;
          }
          
          const user = userResult.rows[0];

          // Verify password
          const passwordValid = await bcrypt.compare(
            credentials.password,
            user.access_token || ''
          );

          if (!passwordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/signup',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      
      // Handle session update
      if (trigger === 'update' && session?.user) {
        if (session.user.name) {
          token.name = session.user.name;
        }
      }
      
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
