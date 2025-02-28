import { Pool } from 'pg';

// Create a singleton PostgreSQL connection pool
let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // You can add additional configuration options here
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 2000, // How long to wait for a connection to become available
    });
    
    // Log when the pool is created
    console.log('PostgreSQL connection pool created');
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
      process.exit(-1);
    });
  }
  
  return pool;
}

// Helper function to execute SQL queries
export async function query(text: string, params: any[] = []) {
  const start = Date.now();
  const pool = getPool();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  
  // Log query execution time in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  
  return res;
}

// Close the pool when the application shuts down
process.on('SIGINT', () => {
  if (pool) {
    pool.end();
    console.log('PostgreSQL connection pool closed');
  }
  process.exit(0);
});
