import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sql } from '@/app/db';

export async function GET() {
  try {
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema SQL
    await sql`${schemaSQL}`;
    
    return NextResponse.json({ success: true, message: 'Migration completed successfully' });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
