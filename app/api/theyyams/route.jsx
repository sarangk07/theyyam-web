// app/api/theyyams/route.js
import { NextResponse } from 'next/server';
import { openDB } from '../../../db.mjs';


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






//DELETE endpoint
export async function DELETE(request) {
    const db = await openDB();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // First, delete related records in temple_theyyams
        await db.run('DELETE FROM temple_theyyams WHERE theyyam_id = ?', [id]);

        // Then delete the theyyam
        const result = await db.run('DELETE FROM theyyams WHERE id = ?', [id]);

        if (result.changes === 0) {
            return NextResponse.json({ error: 'Theyyam not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Theyyam deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /api/theyyams:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PATCH(request) {
    const db = await openDB();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.formData();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // Check if theyyam exists
        const existing = await db.get('SELECT * FROM theyyams WHERE id = ?', [id]);
        if (!existing) {
            return NextResponse.json({ error: 'Theyyam not found' }, { status: 404 });
        }

        // Only include fields that are actually provided in the request
        const updateData = {};
        
        // Check each field and only include if it exists in the request
        if (body.has('name')) updateData.name = body.get('name');
        if (body.has('descriptions')) updateData.descriptions = body.get('descriptions');
        if (body.has('popularity')) updateData.popularity = body.get('popularity');
        if (body.has('story')) updateData.story = body.get('story');
        if (body.has('god')) updateData.god = body.get('god');
        if (body.has('temples')) {
            updateData.temples = JSON.stringify([body.get('temples')]);
        }

        // Handle image updates only if provided
        if (body.has('img')) {
            const newImg = body.get('img');
            updateData.img = newImg.name;
        }

        if (body.has('imgs')) {
            const newImgs = body.getAll('imgs');
            updateData.imgs = JSON.stringify(newImgs.map(file => file.name));
        }

        // Only proceed if there are fields to update
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        // Construct UPDATE query only for provided fields
        const keys = Object.keys(updateData);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(updateData), id];

        const result = await db.run(
            `UPDATE theyyams SET ${setClause} WHERE id = ?`,
            values
        );

        if (result.changes === 0) {
            return NextResponse.json({ error: 'No changes made' }, { status: 400 });
        }

        return NextResponse.json({ 
            message: 'Theyyam updated successfully',
            id: id,
            updatedFields: keys
        });
    } catch (error) {
        console.error('Error in PATCH /api/theyyams:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}