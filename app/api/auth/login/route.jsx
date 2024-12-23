
import { openDB } from '@/db.mjs';  
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const SECRET_KEY = 'your-secret-key'; 
export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const db = await openDB();

       
        const admin = await db.get('SELECT * FROM admins WHERE username = ?', [username]);
        
        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        
        const passwordMatch = await bcrypt.compare(password, admin.password);
        
        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        
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