
import { openDB } from '@/db.mjs';  // Adjust the import path according to your project structure
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const SECRET_KEY = 'your-secret-key'; // In production, use environment variable

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const db = await openDB();

        // Get admin user from database
        const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);
        
        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, admin.password);
        
        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = sign(
            { id: admin.id, username: admin.username },
            SECRET_KEY,
            { expiresIn: '24h' }
        );
        
        return NextResponse.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}