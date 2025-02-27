import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/app/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    const { fullName, email, phone, password } = data;
    
    // Validate the input
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUsers = await sql`
      SELECT user_id FROM users WHERE email = ${email}
    `;
    
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the user
    const result = await sql`
      INSERT INTO users (
        full_name, 
        email, 
        phone, 
        password_hash, 
        created_at, 
        updated_at,
        email_verified
      ) VALUES (
        ${fullName}, 
        ${email}, 
        ${phone}, 
        ${hashedPassword}, 
        NOW(), 
        NOW(),
        ${false}  -- Email not verified yet
      ) RETURNING user_id
    `;
    
    // Log the registration
    await sql`
      INSERT INTO user_activities (
        user_id,
        activity_type,
        description,
        created_at
      ) VALUES (
        ${result[0].user_id},
        'registration',
        ${'User registered with email'},
        NOW()
      )
    `;
    
    // Return success
    return NextResponse.json(
      { 
        message: 'Registration successful',
        userId: result[0].user_id
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
