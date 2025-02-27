import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    
    // Create a direct connection
    const client = neon(process.env.DATABASE_URL);
    
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the SQL by statements (assuming they end with semicolons)
    // This is a simple approach and might not work for all SQL scripts
    // especially those with semicolons in strings or other contexts
    const statements = schemaSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    const results = [];
    
    // Execute each statement separately
    for (const statement of statements) {
      try {
        const result = await client(`${statement};`);
        results.push({ success: true, statement: statement.substring(0, 50) + '...' });
      } catch (statementError) {
        console.error(`Error executing statement: ${statement.substring(0, 100)}...`);
        console.error(statementError);
        // Continue with other statements even if one fails
        results.push({ 
          success: false, 
          statement: statement.substring(0, 50) + '...', 
          error: String(statementError)
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Migration completed. Executed ${results.length} statements.`,
      details: results
    });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
