import { PGlite } from "@electric-sql/pglite";

let pgLiteInstance: PGlite | null = null;

export const getDb = async () => {
  if (!pgLiteInstance) {
    pgLiteInstance = new PGlite("idb://patient_db");
    await initializeSchema(pgLiteInstance);
  }

  return pgLiteInstance;
};

async function initializeSchema(db: PGlite) {
  try {
    const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'patients'
      );
    `);

    if (!(tableExists.rows[0] as { exists: boolean })?.exists) {
      await db.exec(`
        CREATE TABLE patients (
          id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT UNIQUE,
          date_of_birth DATE NOT NULL,
          gender TEXT NOT NULL,
          phone TEXT,
          address TEXT,
          medical_history TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log("Database schema initialized");
    } else {
      console.log("Database schema already exists");
    }
  } catch (error) {
    console.error("Error initializing schema:", error);
    throw error;
  }
}

export async function runQuery(sql: string, params: any[] = []) {
  const db = await getDb();
  try {
    if (params.length > 0) {
      const result = await db.query(sql, params);
      return result.rows;
    } else {
      const result = await db.query(sql);
      return result.rows;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
if (typeof window !== "undefined") {
  getDb().catch(console.error);
}
