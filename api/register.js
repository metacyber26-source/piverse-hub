// api/register.js
import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  
  const { username } = req.body;
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  
  try {
    await client.connect();
    // Memasukkan user baru ke database
    const query = 'INSERT INTO users(pi_username, reward_points) VALUES($1, 0) ON CONFLICT (pi_username) DO NOTHING';
    await client.query(query, [username]);
    await client.end();
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
