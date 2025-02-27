import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    
    // Create a direct connection instead of using the sql tag template
    const client = neon(process.env.DATABASE_URL);
    
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
    let schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema SQL directly
    const result = await client(schemaSQL);
    
    return NextResponse.json({ success: true, message: 'Migration completed successfully' });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
