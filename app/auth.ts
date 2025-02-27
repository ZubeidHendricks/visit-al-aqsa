import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { sql } from './db';
import type { User } from 'next-auth';

// Define a custom user type that includes additional fields
interface DbUser extends User {
  id: string;
  phone?: string;
  role?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Google OAuth provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // Facebook OAuth provider
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    // Instagram and WhatsApp are typically managed through the Facebook developer console
    // There's no direct provider for WhatsApp in NextAuth
    // For Instagram, we could potentially use a custom provider, but it requires more complex setup
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Get or create user in our database
        await storeUserInDb(user, account.provider);
        
        // Add custom fields to the token
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to the session
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // You could add more fields from your database here
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
});

// Function to store user data in our database when they sign in with OAuth
async function storeUserInDb(user: User, provider: string) {
  try {
    // Check if user already exists
    const existingUsers = await sql`
      SELECT user_id FROM users WHERE email = ${user.email}
    `;
    
    if (existingUsers.length === 0) {
      // Create a new user
      await sql`
        INSERT INTO users (
          full_name, 
          email, 
          phone, 
          password_hash, 
          created_at, 
          updated_at,
          email_verified
        ) VALUES (
          ${user.name || 'User'}, 
          ${user.email || ''}, 
          ${''},  -- Phone will be empty initially
          ${'oauth_user'}, -- No password for OAuth users
          NOW(), 
          NOW(),
          ${true}  -- Email is verified through OAuth
        )
      `;
      
      // Log OAuth sign in details
      await sql`
        INSERT INTO user_activities (
          user_id,
          activity_type,
          description,
          created_at
        ) VALUES (
          (SELECT user_id FROM users WHERE email = ${user.email}),
          'oauth_signup',
          ${`User signed up via ${provider}`},
          NOW()
        )
      `;
    } else {
      // Log OAuth sign in for existing user
      await sql`
        INSERT INTO user_activities (
          user_id,
          activity_type,
          description,
          created_at
        ) VALUES (
          (SELECT user_id FROM users WHERE email = ${user.email}),
          'oauth_signin',
          ${`User signed in via ${provider}`},
          NOW()
        )
      `;
    }
  } catch (error) {
    console.error('Error storing user in database:', error);
  }
}
