import { openDB } from '../../../db.mjs';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// Helper function to verify token
async function verifyToken(headersList) {
    const authorization = headersList.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return false;
    }
    const token = authorization.split(' ')[1];
    // Add your token verification logic here
    return true; // Return true if token is valid
}

export async function GET() {
    try {
        const db = await openDB();
        const temples = await db.all('SELECT * FROM temples');
        
        // Get theyyams for each temple
        for (let temple of temples) {
            const theyyams = await db.all(`
                SELECT t.* FROM theyyams t
                JOIN temple_theyyams tt ON t.id = tt.theyyam_id
                WHERE tt.temple_id = ?
            `, [temple.id]);
            temple.theyyams = theyyams;
            temple.images = JSON.parse(temple.images || '[]');
        }
        
        return NextResponse.json(temples, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
}


export async function POST(request) {
    const db = await openDB();
    
    try {
        const headersList = headers();
        const formData = await request.formData();
        
        // Extract form data
        const temple = {
            name: formData.get('name1'),
            place: formData.get('Place1'),
            location: formData.get('Location1') || null,
            phone: formData.get('Phone1') || null,
            address: formData.get('Address1') || null,
            popularity: formData.get('popularity1'),
            festival_duration_days: formData.get('duration1'),
            malayala_masam: formData.get('malayala_masam1'),
            festival_start_time: formData.get('start1'),
            festival_end_time: formData.get('end1')
        };

        // Handle image files
        const img1 = formData.get('img1');
        const imgs1 = formData.get('imgs1');

        // Store file names or paths instead of the actual files
        let imgPath = null;
        let imagesArray = [];

        if (img1 instanceof File) {
            imgPath = img1.name;  // For now, just store the filename
        }

        if (imgs1 instanceof File) {
            imagesArray.push(imgs1.name);  // For now, just store the filename
        }

        // For debugging
        console.log('Inserting temple with data:', {
            ...temple,
            imgPath,
            imagesArray
        });

        const result = await db.run(`
            INSERT INTO temples (
                name, place, location, phone, address, img, images,
                popularity, festival_duration_days, malayala_masam,
                festival_start_time, festival_end_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            temple.name,
            temple.place,
            temple.location,
            temple.phone,
            temple.address,
            imgPath,  // Store the file path/name instead of the file itself
            JSON.stringify(imagesArray),  // Store array of file paths/names
            temple.popularity,
            temple.festival_duration_days,
            temple.malayala_masam,
            temple.festival_start_time,
            temple.festival_end_time
        ]);

        return NextResponse.json(
            { 
                id: result.lastID,
                message: 'Temple created successfully'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Temple creation error:', error);
        return NextResponse.json(
            { 
                error: 'Server error occurred',
                details: error.message
            },
            { status: 500 }
        );
    } finally {
        await db.close();
    }
}



export async function DELETE(request) {
    const db = await openDB();
    
    try {
        const { searchParams } = new URL(request.url);
        const templeId = searchParams.get('id');

        if (!templeId) {
            return NextResponse.json(
                { error: 'Temple ID is required' },
                { status: 400 }
            );
        }

        const result = await db.run(`
            DELETE FROM temples WHERE id = ?
        `, [templeId]);

        if (result.changes === 0) {
            return NextResponse.json(
                { error: 'Temple not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Temple deleted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error deleting temple:', error);
        return NextResponse.json(
            { error: 'Server error occurred', details: error.message },
            { status: 500 }
        );
    } finally {
        await db.close();
    }
}






export async function PUT(request) {
    const db = await openDB();
    
    try {
        const headersList = headers();
        const formData = await request.formData();
        
        // Extract temple ID from form data
        const templeId = formData.get('id');
        
        if (!templeId) {
            return NextResponse.json(
                { error: 'Temple ID is required for updating' },
                { status: 400 }
            );
        }

        // Extract updated form data
        const temple = {
            name: formData.get('name1'),
            place: formData.get('Place1'),
            location: formData.get('Location1') || null,
            phone: formData.get('Phone1') || null,
            address: formData.get('Address1') || null,
            popularity: formData.get('popularity1'),
            festival_duration_days: formData.get('duration1'),
            malayala_masam: formData.get('malayala_masam1'),
            festival_start_time: formData.get('start1'),
            festival_end_time: formData.get('end1')
        };

        // Handle image files
        const img1 = formData.get('img1');
        const imgs1 = formData.get('imgs1');

        let imgPath = null;
        let imagesArray = [];

        if (img1 instanceof File) {
            imgPath = img1.name;  // Store the filename
        }

        if (imgs1 instanceof File) {
            imagesArray.push(imgs1.name);  // Store the filename
        }

        // For debugging
        console.log('Updating temple with data:', {
            ...temple,
            imgPath,
            imagesArray
        });

        const result = await db.run(`
            UPDATE temples SET 
                name = ?, place = ?, location = ?, phone = ?, address = ?,
                img = ?, images = ?, popularity = ?, 
                festival_duration_days = ?, malayala_masam = ?,
                festival_start_time = ?, festival_end_time = ?
            WHERE id = ?
        `, [
            temple.name,
            temple.place,
            temple.location,
            temple.phone,
            temple.address,
            imgPath,  
            JSON.stringify(imagesArray),
            temple.popularity,
            temple.festival_duration_days,
            temple.malayala_masam,
            temple.festival_start_time,
            temple.festival_end_time,
            templeId
        ]);

        if (result.changes === 0) {
            return NextResponse.json(
                { error: 'Temple not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Temple updated successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating temple:', error);
        return NextResponse.json(
            { error: 'Server error occurred', details: error.message },
            { status: 500 }
        );
    } finally {
        await db.close();
    }
}