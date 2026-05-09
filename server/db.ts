import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("sslmode=require")
    ? { rejectUnauthorized: false }
    : false,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      dsp_name VARCHAR(255),
      phone VARCHAR(50),
      source VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS source VARCHAR(50)`);
  await pool.query(`ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS dsp_name VARCHAR(255)`);
  console.log("Database initialized — waitlist table ready");
}

export default pool;
