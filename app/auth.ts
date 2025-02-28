import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from './db';
import type { User, Session } from 'next-auth';
import bcrypt from 'bcryptjs';

// Define a custom user type that includes additional fields
// Use this interface in the storeUserInDb function
interface DbUser extends User {
  id: string;
  phone?: string;
  role?: string;
}

// Extend the next-auth session type to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      role?: string;
    }
  }
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
    
    // Credentials provider for email/password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          // Find the user in the database
          const users = await sql`
            SELECT user_id, full_name, email, password_hash, is_admin 
            FROM users 
            WHERE email = ${credentials.email}
          `;
          
          if (users.length === 0) {
            return null;
          }
          
          const user = users[0];
          
          // Check if this is an OAuth user without a password
          if (user.password_hash === 'oauth_user') {
            console.error('OAuth user attempting password login:', credentials.email);
            return null;
          }
          
          // Make sure password is a string to satisfy TypeScript
          const password = String(credentials.password);
          
          // Verify the password
          const isValid = await bcrypt.compare(password, user.password_hash);
          
          if (!isValid) {
            return null;
          }
          
          // Log the successful login
          await sql`
            INSERT INTO user_activities (
              user_id,
              activity_type,
              description,
              created_at
            ) VALUES (
              ${user.user_id},
              'login',
              ${'User logged in with credentials'},
              NOW()
            )
          `;
          
          // Return the user object
          return {
            id: user.user_id.toString(),
            name: user.full_name,
            email: user.email,
            role: user.is_admin ? 'admin' : 'user'
          };
        } catch (error) {
          console.error('Error during credentials authentication:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Get or create user in our database
        await storeUserInDb(user, account.provider);
        
        // Add custom fields to the token
        token.provider = account.provider;
        
        // If user has a role, add it to the token
        if ('role' in user) {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to the session
      if (session.user && token.sub) {
        session.user.id = token.sub;
        
        // Add role to the session if it exists in the token
        if ('role' in token) {
          session.user.role = token.role as string;
        }
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
