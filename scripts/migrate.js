// Database migration script
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in the environment variables');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  try {
    console.log('Starting database migration...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Connect to the database
    const client = await pool.connect();
    
    try {
      console.log('Connected to the database. Executing schema...');
      
      // Begin transaction
      await client.query('BEGIN');
      
      // Execute the schema SQL
      await client.query(schemaSQL);
      
      // Commit transaction
      await client.query('COMMIT');
      
      console.log('Database migration completed successfully!');
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      console.error('Error during migration:', error);
      throw error;
    } finally {
      // Release the client
      client.release();
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the migration
migrate();
