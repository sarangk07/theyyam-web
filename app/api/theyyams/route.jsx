// app/api/theyyams/route.js
import { NextResponse } from 'next/server';
import { openDB } from '../../../db.mjs';
import { authenticateToken } from '../../../middleware/auth';

export async function GET(request) {
    const db = await openDB();
    try {
        const theyyams = await db.all('SELECT * FROM theyyams');
        for (let theyyam of theyyams) {
            theyyam.imgs = JSON.parse(theyyam.imgs || '[]');
            // Get temples for this theyyam
            const temples = await db.all(`
                SELECT t.name FROM temples t
                JOIN temple_theyyams tt ON t.id = tt.temple_id
                WHERE tt.theyyam_id = ?
            `, [theyyam.id]);
            theyyam.temples = temples.map(t => t.name);
        }
        return NextResponse.json(theyyams);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const db = await openDB();
    try {
        const body = await request.formData(); // Use formData() instead of json()
        
        console.log('Received data:', body); // Log incoming data

        const name = body.get('name');
        const descriptions = body.get('descriptions');
        const img = body.get('img');
        const imgs = body.getAll('imgs'); // Get all files for 'imgs'
        const popularity = body.get('popularity');
        const story = body.get('story');
        const god = body.get('god');
        const temples = body.get('temples');

        // Validate required fields
        if (!name || !popularity ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Prepare the data for insertion
        const result = await db.run(`
            INSERT INTO theyyams (
                name, descriptions, img, imgs, popularity,
                story, god, temples
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            name,
            descriptions || '',
            img ? img.name : null, // Store filename or null if not provided
            JSON.stringify(imgs.map(file => file.name)), // Store array of filenames as JSON string
            popularity,
            story || '',
            god || '',
            temples ? JSON.stringify([temples]) : JSON.stringify([]) // Handle temples as needed
        ]);

        return NextResponse.json({ id: result.lastID }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/theyyams:', error); // Log detailed error information
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}