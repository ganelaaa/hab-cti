import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// 1. Create the database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Default XAMPP user
  password: '',      // Default XAMPP password
  database: 'hab_cti',
  waitForConnections: true,
  connectionLimit: 10,
});

export async function GET(request) {
  // Extract the search query from the URL (e.g., ?search=Curcumin)
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  try {
    // 2. The SQL Query: Fetch publications and join their tags
    const query = `
      SELECT 
        p.id, p.resource_type, p.title, p.authors, p.publication_year, p.publisher_info, p.abstract, p.link,
        GROUP_CONCAT(t.tag_name SEPARATOR '||') AS active_tags
      FROM publications p
      LEFT JOIN publication_tags pt ON p.id = pt.publication_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.title LIKE ? OR p.abstract LIKE ?
      GROUP BY p.id;
    `;
    
    const searchString = `%${search}%`;
    const [rows] = await pool.execute(query, [searchString, searchString]);

    // 3. Clean up the data before sending it to React
    const formattedResults = rows.map(row => ({
      ...row,
      // Convert the string of tags into an actual array, or an empty array if none exist
      tags: row.active_tags ? row.active_tags.split('||') : []
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}