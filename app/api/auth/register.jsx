// pages/api/auth/register.js
import { openDB } from '../../../db.mjs';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password, secretKey } = req.body;

        
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ error: 'Invalid secret key' });
        }

        const db = await openDB();

        
        const existingAdmin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);
        
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        await db.run(
            'INSERT INTO admins (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}